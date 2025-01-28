import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import { UsersService } from '../../services/users/users.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

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
    private router: Router
  ) { 
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onLogin(): void {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.userService.login({ email, password });
      this.router.navigate(['/cpanel']);
    }
  }

}

