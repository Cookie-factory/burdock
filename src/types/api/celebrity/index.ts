export type CelebrityCategory = 'YOUTUBE' | 'INSTAGRAM' | 'AFRICATV' | 'TIKTOK';

export type CelebrityItem = {
  id: string;
  name: string;
  category: CelebrityCategory;
};
