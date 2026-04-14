import type { ContentBundle, NewsContent, WeatherContent } from '../contentAdapters/schemas';
import { getMockBundle, getMockNews, getMockWeather } from '../contentAdapters/mockAdapters';
import { readAdminContent } from '../admin/contentAdminStore';
import { getJson } from './http';

interface GeocodeResponse {
  results?: Array<{ latitude: number; longitude: number; name: string }>;
}

interface OpenMeteoResponse {
  current?: {
    temperature_2m: number;
    apparent_temperature: number;
    weather_code: number;
  };
}

interface HNResponse {
  hits: Array<{ title: string | null; url: string | null }>;
}

function weatherCodeToText(code?: number): string {
  if (code === undefined) return 'Condição indisponível';
  if (code < 3) return 'Céu limpo';
  if (code < 49) return 'Nublado';
  if (code < 69) return 'Chuva leve';
  return 'Tempo instável';
}

export async function fetchWeather(city = 'Sao Paulo'): Promise<WeatherContent> {
  try {
    const geo = await getJson<GeocodeResponse>(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`,
      { timeoutMs: 3500, retries: 1, cacheKey: 'geo-sp', cacheTtlMs: 86_400_000 },
    );

    const first = geo.results?.[0];
    if (!first) return getMockWeather();

    const weather = await getJson<OpenMeteoResponse>(
      `https://api.open-meteo.com/v1/forecast?latitude=${first.latitude}&longitude=${first.longitude}&current=temperature_2m,apparent_temperature,weather_code&timezone=America%2FSao_Paulo`,
      { timeoutMs: 3500, retries: 1, cacheKey: 'weather-sp', cacheTtlMs: 300_000 },
    );

    return {
      city: first.name,
      tempC: Math.round(weather.current?.temperature_2m ?? 24),
      feelsLikeC: Math.round(weather.current?.apparent_temperature ?? 26),
      condition: weatherCodeToText(weather.current?.weather_code),
      updatedAt: new Date().toISOString(),
    };
  } catch {
    return getMockWeather();
  }
}

export async function fetchNews(): Promise<NewsContent[]> {
  const admin = readAdminContent();
  if (admin.headlines.length > 0) {
    return admin.headlines.slice(0, 5);
  }

  try {
    const response = await getJson<HNResponse>(
      'https://hn.algolia.com/api/v1/search?query=marketing%20events&tags=story&hitsPerPage=5',
      { timeoutMs: 3500, retries: 1, cacheKey: 'news-general', cacheTtlMs: 180_000 },
    );

    return response.hits
      .filter((item) => Boolean(item.title))
      .map((item) => ({
        title: item.title ?? 'Título indisponível',
        source: 'HN/Algolia',
        url: item.url ?? undefined,
      }));
  } catch {
    return getMockNews();
  }
}

export async function fetchBundle(): Promise<ContentBundle> {
  const mock = getMockBundle();
  const [weather, news] = await Promise.all([fetchWeather(), fetchNews()]);
  const admin = readAdminContent();

  return {
    ...mock,
    weather,
    news,
    agenda: admin.agenda.length ? admin.agenda : mock.agenda,
    menu: admin.menu.dish ? admin.menu : mock.menu,
    music: admin.music.nowPlaying ? admin.music : mock.music,
  };
}
