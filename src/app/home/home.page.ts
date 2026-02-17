import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent,
  IonButton,
  IonIcon,
  ViewWillEnter
} from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { addOutline, folderOpenOutline, settingsOutline, gameControllerOutline } from 'ionicons/icons';
import { GameSave } from '../core/models/game-data.model';
import { GameService } from '../core/services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonButton, IonIcon, TranslatePipe],
})
export class HomePage implements ViewWillEnter {

  lastSave: GameSave | undefined;

  constructor(private router: Router, private gameService: GameService) {
    addIcons({ addOutline, folderOpenOutline, settingsOutline, gameControllerOutline });
  }

  ionViewWillEnter() {
    this.lastSave = this.gameService.getLastSave();
  }

  newGame(): void {
    this.router.navigate(['/new-game']);
  }

  loadGame(): void {
    this.router.navigate(['/load-game']);
  }

  openSettings(): void {
    this.router.navigate(['/settings']);
  }

  continueGame(): void {
    this.router.navigate(['/game', this.lastSave?.id]);
  }
}