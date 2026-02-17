import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import { AppSettings } from '../../core/models/game-data.model';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonList,
    IonItem,
    IonLabel,
    IonToggle,
    IonSelect,
    IonSelectOption
  ],
})
export class SettingsPage implements OnInit {

  settings!: AppSettings;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.settings = this.gameService.getSettings();
  }

  async onSoundToggle(event: any): Promise<void> {
    await this.gameService.updateSettings({ soundEnabled: event.detail.checked });
  }

  async onMusicToggle(event: any): Promise<void> {
    await this.gameService.updateSettings({ musicEnabled: event.detail.checked });
  }

  async onThemeChange(event: any): Promise<void> {
    const theme = event.detail.value;
    await this.gameService.updateSettings({ theme });
    this.gameService.applyTheme(theme);
  }
}
