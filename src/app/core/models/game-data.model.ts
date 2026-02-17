export type LevelStatus = 'locked' | 'unlocked' | 'completed';

// Paramètres globaux de l'application
export interface AppSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  theme: 'light' | 'dark';
  language: 'fr' | 'en';
}

// Une sauvegarde de partie
export interface GameSave {
  id: string;
  name: string;
  creationDate: number; // timestamp
  lastPlayedDate: number; // timestamp
  difficulty: 'easy' | 'medium' | 'hard';
  gameData: GameData;
}

// Structure complète du fichier JSON
export interface AppData {
  settings: AppSettings;
  saves: GameSave[];
}

// Valeurs par défaut
export const DEFAULT_SETTINGS: AppSettings = {
  soundEnabled: true,
  musicEnabled: true,
  theme: 'dark',
  language: 'fr'
};

export const DEFAULT_GAME_DATA: GameData = {
  currentLevelId: null,
  levels: [],
  totalScore: 0,
  totalPlayTime: 0
};

// Un niveau de jeu
export interface GameLevel {
  id: string;
  status: LevelStatus;
  bestScore?: number;
  bestTime?: number; // en secondes
  completedAt?: number; // timestamp
}

// Données spécifiques au jeu
export interface GameData {
  currentLevelId: string | null;
  levels: GameLevel[];
  totalScore: number;
  totalPlayTime: number; // en secondes
}

export const DEFAULT_APP_DATA: AppData = {
  settings: DEFAULT_SETTINGS,
  saves: []
};