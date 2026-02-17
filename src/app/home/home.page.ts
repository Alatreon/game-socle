import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { addOutline, folderOpenOutline, settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonButton, IonIcon, TranslatePipe],
})
export class HomePage {

  constructor(private router: Router) {
    addIcons({ addOutline, folderOpenOutline, settingsOutline });
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