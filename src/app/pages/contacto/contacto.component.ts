import { Component } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-contacto',
  imports: [
    NzFormModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    NzIconModule
  ],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  center: google.maps.LatLngLiteral = { lat: -0.2045, lng: -78.4856 };
  zoom = 15;
  ngOnInit(): void {
    // Verifica si el script ya cargó
    if (typeof google !== 'undefined' && google.maps) {
      this.initMap();
    } else {
      // Espera a que el script cargue
      (window as any).initMap = () => this.initMap();
    }
  }

  initMap(): void {
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: -0.2045, lng: -78.4856 }, // Coordenadas del Edificio Concorde
      zoom: 15,
    });
  }

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Consulta enviada:', this.contactForm.value);
      this.contactForm.reset();
    }
  }
}
