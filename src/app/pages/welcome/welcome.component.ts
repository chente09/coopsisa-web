import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzListModule } from 'ng-zorro-antd/list';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzCardModule,
    NzIconModule,
    NzModalModule,
    NzButtonModule,
    NzCollapseModule,
    NzListModule
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  isModalVisible = false;
  selectedLab: any = null;
  videoUrl: string = 'https://www.youtube.com/embed/2Gg6Seob5Mg?si=TUx5yvYdYCIJXyHE';
  noticia = {
    titulo: 'Gran avance en tecnología',
    descripcion: 'Descubre cómo esta innovación está cambiando el mundo.',
    link: '/noticia-detalle'
  };
  constructor(private sanitizer: DomSanitizer) { }

  safeVideoUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  slides = [
    {
      image: 'https://img.freepik.com/free-vector/futuristic-tech-digital-circuit-line-background-web-innovation_1017-53927.jpg?semt=ais_incoming',
      text: 'Bienvenido a nuestro sitio web',
      buttonText: 'Ver más',
      route: '/home'
    },
    {
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
      text: 'Imagen de Prueba',
      buttonText: 'AHORA',
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
      titulo: 'Imagen de Prueba',
      imagen: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
      link: 'contactanos'
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

  laboratorios = [
    {
      titulo: 'Laboratorio Innovación Textil Sostenible',
      descripcion: 'Diseñamos soluciones innovadoras en el sector textil, promoviendo procesos productivos sostenibles que minimicen el impacto ambiental, fomenten el uso de materiales ecológicos y fortalezcan la economía circular. Este laboratorio busca transformar los desafíos sociales y económicos del sector en oportunidades para un desarrollo más inclusivo y responsable',
      icono: 'skin',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
    },
    {
      titulo: 'Laboratorio Innovación de Soluciones Sostenibles de Desarrollo Territorial',
      descripcion: 'Trabajamos en el diseño e implementación de estrategias que promuevan un desarrollo territorial equilibrado, respetuoso con el medio ambiente y que potencie las capacidades locales. Desde un enfoque innovador, abordamos desafíos sociales y económicos para construir territorios más resilientes y sostenibles.',
      icono: 'global',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
    },
    {
      titulo: 'Laboratorio Movilidad Sostenible',
      descripcion: 'Creamos soluciones que fomenten la transición hacia sistemas de movilidad más sostenibles, accesibles y eficientes. Este laboratorio se enfoca en reducir el impacto ambiental del transporte, mejorar la calidad de vida urbana y garantizar la inclusión de todos los sectores de la sociedad en un entorno más conectado y limpio.',
      icono: 'car',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
    },
    {
      titulo: 'Laboratorio Finanzas Inclusivas y Sostenibles',
      descripcion: 'Diseñamos herramientas y modelos financieros innovadores que promuevan la inclusión económica y la sostenibilidad. Este laboratorio trabaja para reducir las brechas económicas, fomentar la inversión responsable y garantizar el acceso equitativo a servicios financieros que potencien el bienestar social.',
      icono: 'dollar',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
    },
    {
      titulo: 'Laboratorio Innovación Soberanía Alimentaria y Gastronómica Sostenible',
      descripcion: 'Impulsamos soluciones que fortalezcan la soberanía alimentaria mediante prácticas agrícolas sostenibles y la promoción de sistemas gastronómicos responsables. Este laboratorio integra innovación, cuidado del medio ambiente y desarrollo social para garantizar la seguridad alimentaria y la valorización de las culturas locales.',
      icono: 'coffee',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
    },
    {
      titulo: 'Laboratorio Movilidad Sostenible',
      descripcion: 'Creamos soluciones que fomenten la transición hacia sistemas de movilidad más sostenibles, accesibles y eficientes. Este laboratorio se enfoca en reducir el impacto ambiental del transporte, mejorar la calidad de vida urbana y garantizar la inclusión de todos los sectores de la sociedad en un entorno más conectado y limpio.',
      icono: 'car',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
    }
  ];

  openModal(lab: any): void {
    this.selectedLab = lab;
    this.isModalVisible = true;
  }

  handleOk(): void {
    this.isModalVisible = false;
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

}
