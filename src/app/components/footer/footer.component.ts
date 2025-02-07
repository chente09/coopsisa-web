import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LogoService } from '../../services/logo/logo.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  logoUrl: string = 'https://i.postimg.cc/QxZFBQfg/coopsisa-Logo-removebg-preview.png'; // Imagen por defecto

  constructor(
    private logoService: LogoService,
    private cdr: ChangeDetectorRef
  ) { }

  rutas = [
    { label: 'Inicio', icon: 'home', route: 'welcome' },
    { label: 'Sobre CoopSisa', icon: 'team', route: '/quienes-somos' },
    { label: 'Servicios', icon: 'appstore', route: '/servicios' },
    { label: 'Ecosistema', icon: 'branches', route: '/ecosistema' },
    { label: 'Contacto', icon: 'phone', route: '/contacto' }
  ];

  async ngOnInit(): Promise<void> {
    this.loadFooterLogo();
  }

  private loadFooterLogo() {
    this.logoService.currentFooterLogo.subscribe(url => {
      if (url) {
        this.logoUrl = url;
        this.cdr.detectChanges(); // Forzar actualización de la vista si es necesario
      }
    });
  }
}
