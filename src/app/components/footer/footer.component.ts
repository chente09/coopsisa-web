import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LogoService } from '../../services/logo/logo.service';
import { TranslationService } from '../../services/translation/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  logoUrl: string = 'https://i.postimg.cc/QxZFBQfg/coopsisa-Logo-removebg-preview.png'; // Imagen por defecto
  currentLanguage = 'es';
  private languageSubscription!: Subscription;

  routes = {
    es: [
      { label: 'Inicio', icon: 'home', route: 'welcome' },
      { label: 'Sobre CoopSisa', icon: 'team', route: '/quienes-somos' },
      { label: 'Servicios', icon: 'appstore', route: '/servicios' },
      { label: 'Ecosistema', icon: 'branches', route: '/ecosistema' },
      { label: 'Contacto', icon: 'phone', route: '/contacto' }
    ],
    en: [
      { label: 'Home', icon: 'home', route: 'welcome' },
      { label: 'About CoopSisa', icon: 'team', route: '/quienes-somos' },
      { label: 'Services', icon: 'appstore', route: '/servicios' },
      { label: 'Ecosystem', icon: 'branches', route: '/ecosistema' },
      { label: 'Contact', icon: 'phone', route: '/contacto' }
    ]
  };

  // Propiedad computada para obtener las rutas según el idioma
  get rutas() {
    return this.currentLanguage === 'es' ? this.routes.es : this.routes.en;
  }

  constructor(
    private logoService: LogoService,
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef
  ) { }

  

  async ngOnInit(): Promise<void> {
    this.loadFooterLogo();
    this.setupLanguageSubscription();
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  private loadFooterLogo() {
    this.logoService.currentFooterLogo.subscribe(url => {
      if (url) {
        this.logoUrl = url;
        this.cdr.detectChanges(); // Forzar actualización de la vista si es necesario
      }
    });
  }

  private setupLanguageSubscription() {
    this.languageSubscription = this.translationService.currentLanguage$.subscribe(
      lang => {
        this.currentLanguage = lang;
        // Forzar actualización de la vista para que se reflejen los cambios de idioma
        this.cdr.detectChanges();
      }
    );
  }
}
