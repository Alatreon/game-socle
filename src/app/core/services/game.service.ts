import { Injectable } from '@angular/core';
import {
  AppData,
  AppSettings,
  DEFAULT_GAME_DATA,
  GameData,
  GameLevel,
  GameSave,
  LevelStatus
} from '../models/game-data.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private appData!: AppData;
  private currentSave: GameSave | null = null;

  constructor(private storageService: StorageService) { }

  async init(): Promise<void> {
    this.appData = await this.storageService.loadAppData();
    this.applyTheme(this.appData.settings.theme);
  }

  // ===== SETTINGS =====

  getSettings(): AppSettings {
    return this.appData.settings;
  }

  async updateSettings(settings: Partial<AppSettings>): Promise<void> {
    this.appData.settings = { ...this.appData.settings, ...settings };
    await this.storageService.saveAppData(this.appData);
  }

  // ===== SAVES =====

  getAllSaves(): GameSave[] {
    return this.appData.saves;
  }

  getSaveById(id: string): GameSave | undefined {
    return this.appData.saves.find(save => save.id === id);
  }

  getLastSave(): GameSave | undefined {
    if (this.appData.saves.length === 0) {
      return undefined;
    }

    return this.appData.saves.reduce((latest, save) =>
      save.lastPlayedDate > latest.lastPlayedDate ? save : latest
    );
  }

  async createSave(name: string, difficulty: 'easy' | 'medium' | 'hard'): Promise<GameSave> {
    const now = Date.now();
    const newSave: GameSave = {
      id: this.generateId(),
      name,
      creationDate: now,
      lastPlayedDate: now,
      difficulty,
      gameData: { ...DEFAULT_GAME_DATA }
    };

    this.appData.saves.push(newSave);
    await this.storageService.saveAppData(this.appData);
    return newSave;
  }

  async deleteSave(id: string): Promise<void> {
    this.appData.saves = this.appData.saves.filter(save => save.id !== id);
    if (this.currentSave?.id === id) {
      this.currentSave = null;
    }
    await this.storageService.saveAppData(this.appData);
  }

  // ===== CURRENT GAME SESSION =====

  loadSave(id: string): GameSave | null {
    const save = this.getSaveById(id);
    if (save) {
      this.currentSave = save;
      return save;
    }
    return null;
  }

  getCurrentSave(): GameSave | null {
    return this.currentSave;
  }

  async saveCurrentGame(): Promise<void> {
    if (!this.currentSave) return;

    this.currentSave.lastPlayedDate = Date.now();
    await this.storageService.saveAppData(this.appData);
  }

  // ===== GAME DATA UPDATES =====

  async updateGameData(updates: Partial<GameData>): Promise<void> {
    if (!this.currentSave) return;

    this.currentSave.gameData = { ...this.currentSave.gameData, ...updates };
    await this.saveCurrentGame();
  }

  async setCurrentLevel(levelId: string): Promise<void> {
    if (!this.currentSave) return;

    this.currentSave.gameData.currentLevelId = levelId;
    await this.saveCurrentGame();
  }

  // ===== LEVEL MANAGEMENT =====

  async initializeLevels(levelIds: string[], firstUnlocked: number = 1): Promise<void> {
    if (!this.currentSave) return;

    this.currentSave.gameData.levels = levelIds.map((id, index) => ({
      id,
      status: (index < firstUnlocked ? 'unlocked' : 'locked') as LevelStatus
    }));

    await this.saveCurrentGame();
  }

  getLevels(): GameLevel[] {
    return this.currentSave?.gameData.levels || [];
  }

  getLevelById(levelId: string): GameLevel | undefined {
    return this.currentSave?.gameData.levels.find(level => level.id === levelId);
  }

  async updateLevel(levelId: string, updates: Partial<GameLevel>): Promise<void> {
    if (!this.currentSave) return;

    const level = this.currentSave.gameData.levels.find(l => l.id === levelId);
    if (level) {
      Object.assign(level, updates);
      await this.saveCurrentGame();
    }
  }

  async completeLevel(levelId: string, score: number, time: number): Promise<void> {
    if (!this.currentSave) return;

    const levels = this.currentSave.gameData.levels;
    const levelIndex = levels.findIndex(l => l.id === levelId);

    if (levelIndex === -1) return;

    const level = levels[levelIndex];

    // Met à jour le niveau complété
    level.status = 'completed';
    level.completedAt = Date.now();

    // Met à jour le meilleur score si nécessaire
    if (!level.bestScore || score > level.bestScore) {
      level.bestScore = score;
    }

    // Met à jour le meilleur temps si nécessaire
    if (!level.bestTime || time < level.bestTime) {
      level.bestTime = time;
    }

    // Débloque le niveau suivant
    if (levelIndex + 1 < levels.length) {
      levels[levelIndex + 1].status = 'unlocked';
    }

    // Met à jour le score total
    this.currentSave.gameData.totalScore += score;

    await this.saveCurrentGame();
  }

  async addPlayTime(seconds: number): Promise<void> {
    if (!this.currentSave) return;

    this.currentSave.gameData.totalPlayTime += seconds;
    await this.saveCurrentGame();
  }

  // ===== THEME =====

  applyTheme(theme: 'light' | 'dark'): void {
    document.body.classList.toggle('dark', theme === 'dark');
  }

  // ===== UTILS =====

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}