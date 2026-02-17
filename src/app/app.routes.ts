import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'new-game',
    loadComponent: () => import('./pages/new-game/new-game.page').then(m => m.NewGamePage)
  },
  {
    path: 'load-game',
    loadComponent: () => import('./pages/load-game/load-game.page').then(m => m.LoadGamePage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then(m => m.SettingsPage)
  },
  {
    path: 'game/:id',
    loadComponent: () => import('./pages/game/game.page').then(m => m.GamePage)
  },
];