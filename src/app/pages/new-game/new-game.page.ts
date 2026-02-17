import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton
} from '@ionic/angular/standalone';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { GameService } from '../../core/services/game.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.page.html',
  styleUrls: ['./new-game.page.scss'],
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonList,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    TranslatePipe
  ],
})
export class NewGamePage {

  saveName: string = '';
  difficulty: 'easy' | 'medium' | 'hard' = 'medium';
  saveNamePlaceholder: string = '';

  constructor(
    private gameService: GameService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.translate.get('newGame.saveNamePlaceholder').subscribe(value => {
      this.saveNamePlaceholder = value;
    });
  }

  async createGame(): Promise<void> {
    if (!this.saveName.trim()) {
      return;
    }

    const save = await this.gameService.createSave(this.saveName.trim(), this.difficulty);

    // Redirige vers le jeu avec l'ID de la sauvegarde
    this.router.navigate(['/game', save.id]);
  }
}
