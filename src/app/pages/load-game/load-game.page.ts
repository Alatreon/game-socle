import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  ModalController
} from '@ionic/angular/standalone';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { GameSave } from '../../core/models/game-data.model';
import { GameService } from '../../core/services/game.service';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';

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
    private router: Router,
    private modalController: ModalController,
    private translate: TranslateService
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

  async confirmDelete(save: GameSave): Promise<void> {
    const modal = await this.modalController.create({
      component: ConfirmModalComponent,
      componentProps: {
        title: this.translate.instant('confirm.deleteTitle'),
        message: this.translate.instant('confirm.deleteMessage'),
        confirmText: this.translate.instant('confirm.confirm'),
        cancelText: this.translate.instant('confirm.cancel')
      },
      breakpoints: [0, 0.4],
      initialBreakpoint: 0.4
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data === true) {
      await this.gameService.deleteSave(save.id);
      this.loadSaves();
    }
  }

  formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString();
  }
}