import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [ CommonModule, RouterLink ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  rutas = [
    { label: 'Inicio', icon: 'home', route: 'welcome' },
    { label: 'Quiénes Somos', icon: 'team', route: '/quienes-somos' },
    { label: 'Servicios', icon: 'appstore', route: '/servicios' },
    { label: 'Ecosistema', icon: 'branches', route: '/ecosistema' },
    { label: 'Contacto', icon: 'phone', route: '/contacto' }
];
}
