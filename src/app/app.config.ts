import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { icons } from './icons-provider';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

registerLocaleData(en);

// Esta función permite cargar los archivos de traducción
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/languages/', '.json');
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideNzIcons(icons), 
    provideNzI18n(en_US), 
    importProvidersFrom(
      FormsModule,
      // Configuración de ngx-translate
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ), 
    provideAnimationsAsync(), 
    provideHttpClient(), 
    provideFirebaseApp(() => initializeApp({ 
      projectId: "app-pokemon-9a58f", 
      appId: "1:301046760346:web:3fc43e5c2e30bc71083023", 
      storageBucket: "app-pokemon-9a58f.appspot.com", 
      apiKey: "AIzaSyDIrytbyeOLqrML1z-suu_xG3t16trDdCw", 
      authDomain: "app-pokemon-9a58f.firebaseapp.com", 
      messagingSenderId: "301046760346" })), 
      provideAuth(() => getAuth()), 
      provideAnalytics(() => getAnalytics()), 
      ScreenTrackingService, 
      UserTrackingService, 
      provideFirestore(() => getFirestore()), 
      provideStorage(() => getStorage()),
  ]
    
}