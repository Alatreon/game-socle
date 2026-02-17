import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom, inject, provideAppInitializer } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, RouteReuseStrategy, provideRouter, withPreloading } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { AudioService } from './app/core/services/audio.service';
import { GameService } from './app/core/services/game.service';

// Initialisation de l'application
async function initializeApp(): Promise<void> {
  const gameService = inject(GameService);
  const audioService = inject(AudioService);
  const translate = inject(TranslateService);

  // Configure les langues disponibles
  translate.addLangs(['fr', 'en']);
  translate.setFallbackLang('fr');

  // Charge les données sauvegardées
  await gameService.init();

  // Initialise le service audio
  await audioService.init();

  // Applique la langue sauvegardée ou détecte celle de l'appareil
  const settings = gameService.getSettings();
  if (settings.language) {
    translate.use(settings.language);
  } else {
    const browserLang = translate.getBrowserLang();
    const langToUse = browserLang?.match(/fr|en/) ? browserLang : 'fr';
    translate.use(langToUse);
    await gameService.updateSettings({ language: langToUse as 'fr' | 'en' });
  }
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    importProvidersFrom(TranslateModule.forRoot()),
    provideTranslateHttpLoader({
      prefix: './assets/i18n/',
      suffix: '.json'
    }),
    provideAppInitializer(() => initializeApp())
  ],
});
