import { Routes } from '@angular/router';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { EcosistemaComponent } from './pages/ecosistema/ecosistema.component';
import { QuienesSomosComponent } from './pages/quienes-somos/quienes-somos.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  { path: 'contacto', component: ContactoComponent },
  { path: 'ecosistema', component: EcosistemaComponent },
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'servicios', component: ServiciosComponent },
];
