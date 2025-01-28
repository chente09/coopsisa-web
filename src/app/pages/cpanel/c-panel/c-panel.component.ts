import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-c-panel',
  imports: [
    NzLayoutModule,
    NzMenuModule,
    CommonModule,
    NzIconModule,
    NzButtonModule
  ],
  templateUrl: './c-panel.component.html',
  styleUrl: './c-panel.component.css'
})
export class CPanelComponent {
  selectedKey = '1'; // Por defecto, la primera opción

  constructor( private router: Router, private userService: UsersService) {}

  selectSection(key: string): void {
    this.selectedKey = key;
  }

  isLogged(): boolean {
    return this.userService.getCurrentUser() !== null;
  }

  logout(): void {
    // Limpiar la sesión en el servicio
    this.userService.logout();
  
    // Redirigir al usuario a la página de inicio o de login
    this.router.navigate(['/cpanel-login']).then(() => {
      // Forzar la recarga de la página
      window.location.reload();
    });
  }
}
