import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { AppData, AppSettings, GameSave } from '../models/game-data.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private appData!: AppData;

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

  async createSave(name: string, difficulty: 'easy' | 'medium' | 'hard'): Promise<GameSave> {
    const newSave: GameSave = {
      id: this.generateId(),
      name,
      creationDate: Date.now(),
      difficulty,
      gameData: {}
    };

    this.appData.saves.push(newSave);
    await this.storageService.saveAppData(this.appData);
    return newSave;
  }

  async updateSaveGameData(id: string, gameData: Record<string, any>): Promise<void> {
    const save = this.getSaveById(id);
    if (save) {
      save.gameData = gameData;
      await this.storageService.saveAppData(this.appData);
    }
  }

  async deleteSave(id: string): Promise<void> {
    this.appData.saves = this.appData.saves.filter(save => save.id !== id);
    await this.storageService.saveAppData(this.appData);
  }

  // ===== THEME =====

  applyTheme(theme: 'light' | 'dark'): void {
    console.log('applyTheme called with:', theme);
    document.body.classList.toggle('dark', theme === 'dark');
    console.log('body classes:', document.body.className);
  }

  // ===== UTILS =====

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}