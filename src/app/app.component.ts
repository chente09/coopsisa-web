import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { GoogleMapsModule } from '@angular/google-maps';
import { ReactiveFormsModule } from '@angular/forms';
import { WppComponent } from "./components/wpp/wpp.component";
import { UsersService } from './pages/services/users/users.service';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    FooterComponent,
    NavBarComponent,
    GoogleMapsModule,
    ReactiveFormsModule,
    WppComponent,
    CommonModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  showLayout = true; // Controla si se muestra el layout completo (navbar y footer)

  constructor(private router: Router, private userService: UsersService) {}

  ngOnInit(): void {
    // Escucha cambios en la navegación para ocultar el layout en rutas específicas
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Oculta el layout si la ruta actual es '/cpanel' o alguna de sus subrutas
        this.showLayout = !event.url.startsWith('/cpanel');
      });
  }
}
