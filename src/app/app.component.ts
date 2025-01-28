import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { GoogleMapsModule } from '@angular/google-maps';
import { ReactiveFormsModule } from '@angular/forms';
import { WppComponent } from "./components/wpp/wpp.component";
import { UsersService } from './pages/services/users/users.service';


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
    WppComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  showLayout = true; // Controla si se muestra el layout completo (navbar y footer)

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    const user = this.userService.getCurrentUser();
    if (user && user.email === 'admin-coopsisa@coopsisa.com') {
      this.showLayout = false; // Oculta navbar y footer para el admin
    }
  }
}
