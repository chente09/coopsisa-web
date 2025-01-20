import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule, NzCardModule, NzIconModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  slides = [
    {
      image: 'https://img.freepik.com/free-vector/futuristic-tech-digital-circuit-line-background-web-innovation_1017-53927.jpg?semt=ais_incoming',
      text: 'Bienvenido a nuestro sitio web',
      buttonText: 'Ver más',
      route: '/home'
    },
    {
      image: 'https://img.freepik.com/free-vector/abstract-particles-background-with-light-effect_1017-20135.jpg?semt=ais_incoming',
      text: 'Explora nuestras características',
      buttonText: 'Explorar',
      route: '/features'
    },
    {
      image: 'https://img.freepik.com/free-vector/digital-technology-with-hexagonal-shapes_1017-29805.jpg?semt=ais_incoming',
      text: 'Conoce nuestros servicios',
      buttonText: 'Servicios',
      route: '/services'
    },
    {
      image: 'https://img.freepik.com/free-vector/digial-circuit-diagram-technology-background_1017-28403.jpg?semt=ais_incoming',
      text: 'Contáctanos para más información',
      buttonText: 'Contacto',
      route: '/contact'
    }
  ];
  items: Array<{ title: string; description: string; image: string }> = [
    {
      title: 'Europe Street beat',
      description: 'www.instagram.com',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
    },
    {
      title: 'Ocean Breeze',
      description: 'www.example.com',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
    },
    {
      title: 'Mountain Trek',
      description: 'www.sample.com',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
    },
    {
      title: 'Europe Street beat',
      description: 'www.instagram.com',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
    },
    {
      title: 'Ocean Breeze',
      description: 'www.example.com',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
    },
    {
      title: 'Mountain Trek',
      description: 'www.sample.com',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
    },
    // Agrega más objetos si es necesario
  ];

  tarjetas = [
    {
      titulo: 'Tarjeta 1',
      imagen: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
      link: 'recetas.html'
    },
    {
      titulo: 'Tarjeta 2',
      imagen: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
      link: 'recetas.html'
    },
    {
      titulo: 'Tarjeta 3',
      imagen: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
      link: 'recetas.html'
    },
    {
      titulo: 'Tarjeta 4',
      imagen: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
      link: 'recetas.html'
    },
    {
      titulo: 'Tarjeta 5',
      imagen: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
      link: 'recetas.html'
    },
    {
      titulo: 'Tarjeta 6',
      imagen: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
      link: 'recetas.html'
    }
  ];


}
