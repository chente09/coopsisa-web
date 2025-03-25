import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoService } from '../../services/logo/logo.service';
import { TranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'app-nav-bar',
  imports: [
    NzMenuModule,
    NzIconModule,
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isCollapsed = false; 
  logoUrl: string = 'https://i.postimg.cc/QxZFBQfg/coopsisa-Logo-removebg-preview.png'; // Imagen por defecto
  currentLanguage: string = 'es'; // Idioma inicial

  constructor(
    private logoService: LogoService,
    private cdr: ChangeDetectorRef,
    private translationService: TranslationService
  ) { 
    this.menuItems = [
      { label: 'Inicio', icon: 'home', route: 'welcome' },
      { label: 'Sobre CoopSisa', icon: 'team', route: '/quienes-somos' },
      { label: 'Servicios', icon: 'appstore', route: '/servicios' },
      { label: 'Ecosistema', icon: 'branches', route: '/ecosistema' },
      { label: 'Contacto', icon: 'phone', route: '/contacto' }
    ];
  }

  menuItems = [
    { label: 'Inicio', icon: 'home', route: 'welcome' },
    { label: 'Sobre CoopSisa', icon: 'team', route: '/quienes-somos' },
    { label: 'Servicios', icon: 'appstore', route: '/servicios' },
    { label: 'Ecosistema', icon: 'branches', route: '/ecosistema' },
    { label: 'Contacto', icon: 'phone', route: '/contacto' }
  ];

  menuItemsEn = [
    { label: 'Home', icon: 'home', route: 'welcome' },
    { label: 'About CoopSisa', icon: 'team', route: '/quienes-somos' },
    { label: 'Services', icon: 'appstore', route: '/servicios' },
    { label: 'Ecosystem', icon: 'branches', route: '/ecosistema' },
    { label: 'Contact', icon: 'phone', route: '/contacto' },
  ];
  
  async ngOnInit(): Promise<void> {
    this.updateMenuState(); 
    this.loadNavbarLogo();
  }

  private loadNavbarLogo() {
    this.logoService.currentNavbarLogo.subscribe(url => {
      if (url) {
        this.logoUrl = url;
        this.cdr.detectChanges(); // Forzar la actualización de la vista si es necesario
      }
    });
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateMenuState();
  }

  toggleMenu() {
    if (window.innerWidth <= 768) { // Solo permitir el colapso en pantallas pequeñas
      this.isCollapsed = !this.isCollapsed;
    }

  }

  private updateMenuState() {
    if (window.innerWidth > 768) {
      this.isCollapsed = false; // Asegura que el menú esté expandido en pantallas grandes
    } else {
      this.isCollapsed = true; // Contrae el menú en pantallas pequeñas
    }
  }

  

  changeLanguage() {
    // Alternar idioma
    this.currentLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
    
    // Actualizar mediante el servicio compartido
    this.translationService.setLanguage(this.currentLanguage);
  
    // Actualizar menú
    this.menuItems = this.currentLanguage === 'en' ? this.menuItemsEn : [
      { label: 'Inicio', icon: 'home', route: 'welcome' },
      { label: 'Sobre CoopSisa', icon: 'team', route: '/quienes-somos' },
      { label: 'Servicios', icon: 'appstore', route: '/servicios' },
      { label: 'Ecosistema', icon: 'branches', route: '/ecosistema' },
      { label: 'Contacto', icon: 'phone', route: '/contacto' }
    ];
  
    // Forzar actualización de la vista
    this.cdr.detectChanges();
  }
  
  


}
