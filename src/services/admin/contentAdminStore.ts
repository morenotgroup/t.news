import type { AgendaItem, MenuContent, MusicContent, NewsContent } from '../contentAdapters/schemas';

const STORAGE_KEY = 'tnews-admin-content';

export interface AdminContent {
  agenda: AgendaItem[];
  menu: MenuContent;
  music: MusicContent;
  headlines: NewsContent[];
}

const defaultAdminContent: AdminContent = {
  agenda: [],
  menu: { dayLabel: 'Hoje', dish: '', notes: '' },
  music: { station: 'MusicDock', nowPlaying: '', next: '' },
  headlines: [],
};

export function readAdminContent(): AdminContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultAdminContent;
    return { ...defaultAdminContent, ...(JSON.parse(raw) as Partial<AdminContent>) };
  } catch {
    return defaultAdminContent;
  }
}

export function writeAdminContent(content: AdminContent): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}
