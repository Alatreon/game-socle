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
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { GameService } from '../../core/services/game.service';
import { AppSettings } from '../../core/models/game-data.model';

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
    private translate: TranslateService
  ) { }

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

  async onLanguageChange(event: any): Promise<void> {
    const language = event.detail.value;
    await this.gameService.updateSettings({ language });
    this.translate.use(language);
  }
}