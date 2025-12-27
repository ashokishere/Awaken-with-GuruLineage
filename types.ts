export interface SlideshowSettings {
  interval: number;
  isPlaying: boolean;
  images: string[];
}

export const DEFAULT_IMAGES = [
  "https://bookstore.yogananda-srf.org/wp-content/uploads/2015/03/PBKC01-600x766.jpg",
  "https://bookstore.yogananda-srf.org/wp-content/uploads/JC2CCsm4C-2025-bookstore.jpg",
  "https://bookstore.yogananda-srf.org/wp-content/uploads/2015/03/PMBC01-600x743.jpg",
  "https://bookstore.yogananda-srf.org/wp-content/uploads/2015/03/PLMC01-600x761.jpg",
  "https://bookstore.yogananda-srf.org/wp-content/uploads/2015/03/PSYC01-600x734.jpg",
  "https://bookstore.yogananda-srf.org/wp-content/uploads/PY-Standard-Pose-for-Bookstore-799x1030.jpg"
];

export const STORAGE_KEY = 'gurulineage_v1_config';