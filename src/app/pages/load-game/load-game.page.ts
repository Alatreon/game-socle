import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  IonIcon,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { GameService } from '../../core/services/game.service';
import { GameSave } from '../../core/models/game-data.model';

@Component({
  selector: 'app-load-game',
  templateUrl: './load-game.page.html',
  styleUrls: ['./load-game.page.scss'],
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
    IonIcon,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    TranslatePipe
  ],
})
export class LoadGamePage implements OnInit {

  saves: GameSave[] = [];

  constructor(
    private gameService: GameService,
    private router: Router
  ) {
    addIcons({ trashOutline });
  }

  ngOnInit(): void {
    this.loadSaves();
  }

  loadSaves(): void {
    this.saves = this.gameService.getAllSaves();
  }

  loadGame(save: GameSave): void {
    this.router.navigate(['/game', save.id]);
  }

  async deleteSave(save: GameSave): Promise<void> {
    await this.gameService.deleteSave(save.id);
    this.loadSaves();
  }

  formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString();
  }
}