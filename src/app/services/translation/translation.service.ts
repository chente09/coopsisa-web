import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export type Language = 'es' | 'en';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  // BehaviorSubject para mantener y compartir el estado actual del idioma
  private languageSubject = new BehaviorSubject<string>('es'); // 'es' como idioma por defecto
  public language$ = this.languageSubject.asObservable();// Observable para que los componentes se suscriban

  // Objeto para almacenar las traducciones en caché
  private translations: Record<string, Record<string, string>> = {};

  // URL de la API de LibreTranslate
  private readonly LIBRETRANSLATE_API_URL = 'https://libretranslate.com/translate';

  constructor(private http: HttpClient) {
    // Intentar cargar el idioma desde localStorage si existe
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      this.setLanguage(savedLanguage as Language);
    }
  }

  /**
   * Cambia el idioma actual y actualiza localStorage
   */
  setLanguage(lang: string) {
    this.languageSubject.next(lang); // 👈 Actualiza el idioma y notifica a los suscriptores
  }

  getCurrentLanguage(): string {
    return this.languageSubject.getValue(); // 👈 Devuelve el idioma actual
  }

  /**
   * Traduce un texto usando la API de LibreTranslate
   */
  translateText(text: string, targetLanguage?: Language): Promise<string> {
    const language = targetLanguage || this.getCurrentLanguage();

    // Revisar si ya tenemos esta traducción en caché
    if (this.translations[text] && this.translations[text][language]) {
      return Promise.resolve(this.translations[text][language]);
    }

    // Integración con LibreTranslate
    return this.http.post<{ translatedText: string }>(this.LIBRETRANSLATE_API_URL, {
      q: text,
      source: 'es', // Idioma fuente (puedes cambiarlo si es necesario)
      target: language,
      format: 'text'
    }).toPromise()
      .then(response => {
        const translatedText = response?.translatedText ?? text;
        // Guardar en caché
        if (!this.translations[text]) {
          this.translations[text] = {};
        }
        this.translations[text][language] = translatedText;
        return translatedText;
      })
      .catch(error => {
        console.error('Error translating text:', error);
        return text; // Devuelve el texto original en caso de error
      });
  }

  /**
   * Traduce un objeto completo, manteniendo la estructura pero traduciendo valores
   */
  async translateObject<T extends Record<string, any>>(
    obj: T,
    fieldsToTranslate: (keyof T)[]
  ): Promise<T> {
    const language = this.getCurrentLanguage();

    // Si el idioma actual es español (default), devolver objeto original
    if (language === 'es') {
      return { ...obj };
    }

    // Crear copia para no modificar el original
    const translatedObj = { ...obj };

    // Traducir solo los campos especificados
    for (const field of fieldsToTranslate) {
      if (typeof obj[field] === 'string') {
        translatedObj[field] = await this.translateText(obj[field] as string, language as Language) as T[keyof T];
      }
    }

    return translatedObj;
  }

  /**
   * Traduce un array de objetos
   */
  async translateArray<T extends Record<string, any>>(
    array: T[],
    fieldsToTranslate: (keyof T)[]
  ): Promise<T[]> {
    const language = this.getCurrentLanguage();

    // Si el idioma actual es español (default), devolver array original
    if (language === 'es') {
      return [...array];
    }

    // Traducir cada objeto en el array
    const promises = array.map(item =>
      this.translateObject(item, fieldsToTranslate)
    );

    return Promise.all(promises);
  }
}
