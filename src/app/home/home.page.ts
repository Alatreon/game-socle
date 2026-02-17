import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonIcon,
  ViewWillEnter
} from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { addOutline, folderOpenOutline, gameControllerOutline, settingsOutline } from 'ionicons/icons';
import { GameSave } from '../core/models/game-data.model';
import { AudioService } from '../core/services/audio.service';
import { GameService } from '../core/services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonButton, IonIcon, TranslatePipe],
})
export class HomePage implements ViewWillEnter {

  lastSave: GameSave | undefined;

  constructor(private router: Router, private gameService: GameService, private audioService: AudioService) {
    addIcons({ addOutline, folderOpenOutline, settingsOutline, gameControllerOutline });
  }

  ionViewWillEnter() {
    this.lastSave = this.gameService.getLastSave();
  }

  continueGame(): void {
    this.audioService.playSound('click');
    console.log("test 1234");
    this.router.navigate(['/game', this.lastSave?.id]);
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

}