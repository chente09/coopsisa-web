import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from '../../../services/users/users.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-cpanel-login',
  imports: [
    NzCardModule,
    NzInputModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzFormModule,
    FormsModule
  ],
  templateUrl: './cpanel-login.component.html',
  styleUrl: './cpanel-login.component.css'
})
export class CpanelLoginComponent {

  form: FormGroup;

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    (window as any).recuperarContrasena = this.recuperarContrasena.bind(this);
  }

  onLogin(): void {
    if (this.form.invalid) {
      this.message.error("Por favor, complete todos los campos correctamente.");
      return;
    }
  
    const { email, password } = this.form.value;
  
    this.userService.login({ email, password })
      .then(() => {
        this.message.success("Inicio de sesión exitoso. Redirigiendo...");
        this.router.navigate(['/administracion']);
      })
      .catch(() => {
        this.message.error("Correo o contraseña incorrectos. Intente nuevamente.");
      });
  }
  

  recuperarContrasena() {
    alert("Para recuperar tu contraseña, comunícate con el soporte: 0969375372");
  }

}

