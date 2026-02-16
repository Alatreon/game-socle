import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { AppData, DEFAULT_APP_DATA } from '../models/game-data.model';

const STORAGE_KEY = 'game_app_data';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  // Charge toutes les données de l'application
  async loadAppData(): Promise<AppData> {
    const { value } = await Preferences.get({ key: STORAGE_KEY });
    
    if (value) {
      return JSON.parse(value) as AppData;
    }
    
    // Premier lancement : initialise avec les valeurs par défaut
    await this.saveAppData(DEFAULT_APP_DATA);
    return DEFAULT_APP_DATA;
  }

  // Sauvegarde toutes les données de l'application
  async saveAppData(data: AppData): Promise<void> {
    await Preferences.set({
      key: STORAGE_KEY,
      value: JSON.stringify(data)
    });
  }

  // Réinitialise tout (utile pour debug ou option "reset")
  async resetAppData(): Promise<void> {
    await this.saveAppData(DEFAULT_APP_DATA);
  }
}