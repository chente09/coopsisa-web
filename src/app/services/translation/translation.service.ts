import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export type Language = 'es' | 'en';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private currentLanguageSubject = new BehaviorSubject<string>('es');
  
  // Observable que los componentes pueden suscribir
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor() {}

  // Método para cambiar el idioma
  setLanguage(lang: string): void {
    this.currentLanguageSubject.next(lang);
  }

  // Método para obtener el idioma actual (opcional)
  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

}
