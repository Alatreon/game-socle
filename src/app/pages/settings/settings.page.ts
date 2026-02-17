import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar
} from '@ionic/angular/standalone';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AppSettings } from '../../core/models/game-data.model';
import { AudioService } from '../../core/services/audio.service';
import { GameService } from '../../core/services/game.service';

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
    IonSelectOption,
    TranslatePipe
  ],
})
export class SettingsPage implements OnInit {

  settings!: AppSettings;

  constructor(
    private gameService: GameService,
    private audioService: AudioService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.settings = this.gameService.getSettings();
  }

  async onSoundToggle(event: any): Promise<void> {
    const enabled = event.detail.checked;
    await this.gameService.updateSettings({ soundEnabled: enabled });
    this.audioService.onSoundSettingChanged(enabled);
  }

  async onMusicToggle(event: any): Promise<void> {
    const enabled = event.detail.checked;
    await this.gameService.updateSettings({ musicEnabled: enabled });
    this.audioService.onMusicSettingChanged(enabled);
  }

  async onThemeChange(event: any): Promise<void> {
    const theme = event.detail.value;
    await this.gameService.updateSettings({ theme });
    this.gameService.applyTheme(theme);
  }

  async onLanguageChange(event: any): Promise<void> {
    const language = event.detail.value;
    await this.gameService.updateSettings({ language });
    this.translate.use(language);
  }
}