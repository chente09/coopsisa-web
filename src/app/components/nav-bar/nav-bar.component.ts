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

  ) { }

  menuItems = [
    { label: 'Inicio', icon: 'home', route: 'welcome' },
    { label: 'Sobre CoopSisa', icon: 'team', route: '/quienes-somos' },
    { label: 'Servicios', icon: 'appstore', route: '/servicios' },
    { label: 'Ecosistema', icon: 'branches', route: '/ecosistema' },
    { label: 'Contacto', icon: 'phone', route: '/contacto' },
    {
      label: 'Submenu',
      icon: 'setting',
      route: '',
      children: [
        { label: 'Option 1', route: '/option1' },
        { label: 'Option 2', route: '/option2' },
        {
          label: 'Subsubmenu',
          children: [
            { label: 'Option 3', route: '/option3' },
            { label: 'Option 4', route: '/option4' }
          ]
        }
      ]
    }
  ];

  menuItemsEn = [
    { label: 'Home', icon: 'home', route: 'welcome' },
    { label: 'About CoopSisa', icon: 'team', route: '/about-us' },
    { label: 'Services', icon: 'appstore', route: '/services' },
    { label: 'Ecosystem', icon: 'branches', route: '/ecosystem' },
    { label: 'Contact', icon: 'phone', route: '/contact' },
  ];
  
  async ngOnInit(): Promise<void> {
    this.updateMenuState(); 
    this.loadNavbarLogo();   
    this.translationService.language$.subscribe(lang => {
      this.currentLanguage = lang;
      console.log('Idioma actual:', lang);
    }); 
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
    const newLang = this.currentLanguage === 'es' ? 'en' : 'es';
    this.translationService.setLanguage(newLang);
  
    // Asignar directamente el nuevo conjunto de menú en lugar de modificar uno existente
    this.menuItems = this.currentLanguage === 'en' ? this.menuItemsEn : [
      { label: 'Inicio', icon: 'home', route: 'welcome' },
      { label: 'Sobre CoopSisa', icon: 'team', route: '/quienes-somos' },
      { label: 'Servicios', icon: 'appstore', route: '/servicios' },
      { label: 'Ecosistema', icon: 'branches', route: '/ecosistema' },
      { label: 'Contacto', icon: 'phone', route: '/contacto' },
      {
        label: 'Submenu',
        icon: 'setting',
        route: '',
        children: [
          { label: 'Opción 1', route: '/option1' },
          { label: 'Opción 2', route: '/option2' },
          {
            label: 'Subsubmenu',
            children: [
              { label: 'Opción 3', route: '/option3' },
              { label: 'Opción 4', route: '/option4' }
            ]
          }
        ]
      }
    ];
  
    // Forzar actualización de la vista
    this.cdr.detectChanges();
  }
  
  


}
