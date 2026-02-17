import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { inject, importProvidersFrom, provideAppInitializer } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { GameService } from './app/core/services/game.service';

// Initialisation de l'application
async function initializeApp(): Promise<void> {
  const gameService = inject(GameService);
  const translate = inject(TranslateService);

  // Configure les langues disponibles
  translate.addLangs(['fr', 'en']);
  translate.setFallbackLang('fr');

  // Charge les données sauvegardées
  await gameService.init();

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