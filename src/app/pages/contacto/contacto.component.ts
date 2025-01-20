import { Component, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-contacto',
  imports: [
    NzFormModule,
    GoogleMapsModule,
    NzIconModule,
    NzCardModule,
    CommonModule,
    ReactiveFormsModule,
    NzInputModule
  ],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  animations: [
    trigger('fieldState', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
      transition(':enter', [
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ])
  ]
})
export class ContactoComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: -0.2045, lng: -78.4856 };
  zoom = 15;
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    // Inicializa el mapa si está disponible
    if (typeof google !== 'undefined' && google.maps) {
      this.initMap();
    } else {
      (window as any).initMap = () => this.initMap();
    }
  }

  initMap(): void {
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: -0.2045, lng: -78.4856 },
      zoom: 15,
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Consulta enviada:', this.contactForm.value);
      this.contactForm.reset();
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  markAllFieldsAsTouched(): void {
    Object.values(this.contactForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  hasError(field: string, error: string): boolean {
    const control = this.contactForm.get(field);
    return control ? control.hasError(error) : false;
  }
}
