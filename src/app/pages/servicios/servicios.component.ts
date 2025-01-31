import { Component } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-servicios',
  imports: [
    NzModalModule,
    NzIconModule,
    CommonModule,
    NzButtonModule,
    NzCollapseModule,
    NzListModule,
    NzCardModule
  ],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {
  isModalVisible = false;
  selectedLab: any = null;

  laboratorios = [
    {
      titulo: 'Laboratorio Innovación Textil Sostenible',
      descripcion: 'Diseñamos soluciones innovadoras en el sector textil, promoviendo procesos productivos sostenibles que minimicen el impacto ambiental, fomenten el uso de materiales ecológicos y fortalezcan la economía circular. Este laboratorio busca transformar los desafíos sociales y económicos del sector en oportunidades para un desarrollo más inclusivo y responsable',
      icono: 'skin',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' 
    },
    {
      titulo: 'Laboratorio Innovación de Soluciones Sostenibles de Desarrollo Territorial',
      descripcion: 'Trabajamos en el diseño e implementación de estrategias que promuevan un desarrollo territorial equilibrado, respetuoso con el medio ambiente y que potencie las capacidades locales. Desde un enfoque innovador, abordamos desafíos sociales y económicos para construir territorios más resilientes y sostenibles.',
      icono: 'global',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' 
    },
    {
      titulo: 'Laboratorio Movilidad Sostenible',
      descripcion: 'Creamos soluciones que fomenten la transición hacia sistemas de movilidad más sostenibles, accesibles y eficientes. Este laboratorio se enfoca en reducir el impacto ambiental del transporte, mejorar la calidad de vida urbana y garantizar la inclusión de todos los sectores de la sociedad en un entorno más conectado y limpio.',
      icono: 'car',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' 
    },
    {
      titulo: 'Laboratorio Finanzas Inclusivas y Sostenibles',
      descripcion: 'Diseñamos herramientas y modelos financieros innovadores que promuevan la inclusión económica y la sostenibilidad. Este laboratorio trabaja para reducir las brechas económicas, fomentar la inversión responsable y garantizar el acceso equitativo a servicios financieros que potencien el bienestar social.',
      icono: 'dollar',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' 
    },
    {
      titulo: 'Laboratorio Innovación Soberanía Alimentaria y Gastronómica Sostenible',
      descripcion: 'Impulsamos soluciones que fortalezcan la soberanía alimentaria mediante prácticas agrícolas sostenibles y la promoción de sistemas gastronómicos responsables. Este laboratorio integra innovación, cuidado del medio ambiente y desarrollo social para garantizar la seguridad alimentaria y la valorización de las culturas locales.',
      icono: 'coffee',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' 
    }
  ];

  slides = [
    {
      image: 'https://img.freepik.com/free-vector/futuristic-tech-digital-circuit-line-background-web-innovation_1017-53927.jpg?semt=ais_incoming',
      text: 'Comercio Justo',
      buttonText: 'Ver más',
      route: '/home'
    },
    {
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
      text: 'Igualdad de Género',
      buttonText: 'AHORA',
      route: '/features'
    },
    {
      image: 'https://img.freepik.com/free-vector/digital-technology-with-hexagonal-shapes_1017-29805.jpg?semt=ais_incoming',
      text: 'Conciencia sobre el Cambio climático',
      buttonText: 'Servicios',
      route: '/services'
    },
    {
      image: 'https://img.freepik.com/free-vector/digial-circuit-diagram-technology-background_1017-28403.jpg?semt=ais_incoming',
      text: 'Innovación',
      buttonText: 'Contacto',
      route: '/contact'
    },
    {
      image: 'https://img.freepik.com/free-vector/digial-circuit-diagram-technology-background_1017-28403.jpg?semt=ais_incoming',
      text: 'Sostenibilidad',
      buttonText: 'Contacto',
      route: '/contact'
    }
  ];

  openModal(lab: any): void {
    this.selectedLab = lab;
    this.isModalVisible = true;
  }

  handleOk(): void {
    this.isModalVisible = false; // Cierra el modal primero
    setTimeout(() => {
      const section = document.getElementById("tarjetasSection");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 500); // Mayor tiempo de espera para asegurar que el DOM esté listo
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }
}
