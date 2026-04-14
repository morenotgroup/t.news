export interface WeatherContent {
  city: string;
  tempC: number;
  feelsLikeC: number;
  condition: string;
  updatedAt: string;
}

export interface NewsContent {
  title: string;
  source: string;
  url?: string;
}

export interface AgendaItem {
  startAt: string;
  title: string;
}

export interface MenuContent {
  dayLabel: string;
  dish: string;
  notes?: string;
}

export interface MusicContent {
  station: string;
  nowPlaying: string;
  next?: string;
}

export interface ContentBundle {
  weather: WeatherContent;
  news: NewsContent[];
  agenda: AgendaItem[];
  menu: MenuContent;
  music: MusicContent;
}
