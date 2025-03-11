import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-wpp',
  imports: [NzButtonModule, NzIconModule],
  templateUrl: './wpp.component.html',
  styleUrl: './wpp.component.css'
})
export class WppComponent {

  redirectToWhatsApp(): void {
    const phoneNumber = '5930996141063'; // Reemplaza con el número de WhatsApp (código de país + número)
    const message = encodeURIComponent('¡Hola! Me gustaría obtener más información.'); // Mensaje inicial
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank'); // Abre WhatsApp en una nueva pestaña
  }

}
