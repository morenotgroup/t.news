import type {
  AgendaItem,
  ContentBundle,
  MenuContent,
  MusicContent,
  NewsContent,
  WeatherContent,
} from './schemas';

export function getMockWeather(): WeatherContent {
  return {
    city: 'São Paulo',
    tempC: 24,
    feelsLikeC: 26,
    condition: 'Parcialmente nublado',
    updatedAt: new Date().toISOString(),
  };
}

export function getMockNews(): NewsContent[] {
  return [
    { title: 'Mercado de eventos corporativos cresce em 2026', source: 'T.News' },
    { title: 'Tecnologia imersiva vira padrão em ativações premium', source: 'T.News' },
    { title: 'Cases híbridos elevam engajamento em lançamentos', source: 'T.News' },
  ];
}

export function getMockAgenda(): AgendaItem[] {
  return [
    { startAt: '09:30', title: 'Daily criativo' },
    { startAt: '11:00', title: 'Cliente XPTO' },
    { startAt: '17:30', title: 'Happy hour' },
  ];
}

export function getMockMenu(): MenuContent {
  return {
    dayLabel: 'Terça-feira',
    dish: 'Frango com crosta de ervas + risoto de limão siciliano',
    notes: 'Opção vegana disponível',
  };
}

export function getMockMusic(): MusicContent {
  return {
    station: 'SomaFM Groove Salad',
    nowPlaying: 'Ambient Session #42',
    next: 'Deep Focus Blend',
  };
}

export function getMockBundle(): ContentBundle {
  return {
    weather: getMockWeather(),
    news: getMockNews(),
    agenda: getMockAgenda(),
    menu: getMockMenu(),
    music: getMockMusic(),
  };
}
