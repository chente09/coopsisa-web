import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoService } from '../../services/logo/logo.service';

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

  constructor(
    private logoService: LogoService,
    private cdr: ChangeDetectorRef
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

  async ngOnInit(): Promise<void> {
    this.updateMenuState(); 

    // Suscribirse al logo actual
    this.logoService.currentLogo.subscribe(url => {
      if (url) {
        this.logoUrl = url;
      }
    });

    // Cargar el logo actual si aún no se ha actualizado
    this.logoService.loadCurrentLogo();
    this.cdr.detectChanges();
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
    // Lógica para cambiar el idioma, por ejemplo, con un servicio de internacionalización
    console.log('Idioma cambiado');
    // Implementa el cambio real de idioma (puede ser con una librería como ngx-translate)
  }

}
