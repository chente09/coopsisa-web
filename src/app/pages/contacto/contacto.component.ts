import { Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  imports: [
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,
    CommonModule,
    ReactiveFormsModule,
    NzInputModule
  ],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  
})
export class ContactoComponent  {
  center: google.maps.LatLngLiteral = { lat: -0.2045, lng: -78.4856 };
  zoom = 15;
  contactForm: FormGroup;
  collaboratorForm: FormGroup;
  selectedForm: string | null = null;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.collaboratorForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      skills: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  selectForm(type: string): void {
    this.selectedForm = type;
  }
  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Consulta enviada:', this.contactForm.value);
      this.contactForm.reset();
    } else {
      this.markAllFieldsAsTouched(this.contactForm);
    }
  }

  onCollaboratorSubmit(): void {
    if (this.collaboratorForm.valid) {
      console.log('Colaborador enviado:', this.collaboratorForm.value);
      this.collaboratorForm.reset();
    } else {
      this.markAllFieldsAsTouched(this.collaboratorForm);
    }
  }

  private markAllFieldsAsTouched(form: FormGroup): void {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  closeForm(): void {
    this.selectedForm = null;
  }
}
