
import type { Announcement } from '../types';

export const getAnnouncements = async (): Promise<Announcement[]> => {
  const response = await fetch('./announcements.json');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data as Announcement[];
};
