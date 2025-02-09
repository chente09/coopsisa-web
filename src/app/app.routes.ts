import { Routes } from '@angular/router';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { EcosistemaComponent } from './pages/ecosistema/ecosistema.component';
import { QuienesSomosComponent } from './pages/quienes-somos/quienes-somos.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { CpanelLoginComponent } from './pages/cpanel/cpanel-login/cpanel-login.component';
import { CPanelComponent } from './pages/cpanel/c-panel/c-panel.component';
import { FormulariosComponent } from './pages/cpanel/formularios/formularios.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';


export const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/cpanel-login']);

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  { path: 'contacto', component: ContactoComponent },
  { path: 'ecosistema', component: EcosistemaComponent },
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'cpanel-login', component: CpanelLoginComponent },
  { path: 'cpanel', component: CPanelComponent, ...canActivate(redirectUnauthorizedToLogin) }, 
  { path: 'formularios', component: FormulariosComponent, ...canActivate(redirectUnauthorizedToLogin) },
];


