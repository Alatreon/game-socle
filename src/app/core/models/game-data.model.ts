// Paramètres globaux de l'application
export interface AppSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  theme: 'light' | 'dark';
}

// Une sauvegarde de partie
export interface GameSave {
  id: string;
  name: string;
  creationDate: number; // timestamp
  difficulty: 'easy' | 'medium' | 'hard';
  gameData: Record<string, any>; // données spécifiques au jeu (flexible)
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
  theme: 'light'
};

export const DEFAULT_APP_DATA: AppData = {
  settings: DEFAULT_SETTINGS,
  saves: []
};