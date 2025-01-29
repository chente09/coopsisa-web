import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-quienes-somos',
  imports: [
    NzCardModule, 
    NzTimelineModule, 
    CommonModule, 
    FormsModule, 
    NzFlexModule, 
    NzRadioModule,
    NzGridModule,
    NzListModule,
    NzIconModule
  ],
  templateUrl: './quienes-somos.component.html',
  styleUrl: './quienes-somos.component.css'
})
export class QuienesSomosComponent {

  cards = [
    { 
      title: '¿Quiénes somos?', 
      text: 'Somos la primera cooperativa de servicios en Ecuador enfocada en la innovación y sostenibilidad, promoviendo modelos asociativos que contribuyan con la productividad local y nacional.',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' 
    },
    { 
      title: 'Nuestros Principios', 
      text: 'Nuestro trabajo está basado en los principios de la Economía Social y Solidaria y los valores del Cooperativismo, que nos permiten promover el desarrollo sostenible, derechos humanos y la justicia social en los territorios donde trabajamos.',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' 
    },
    { 
      title: 'Nuestro Equipo', 
      text: 'Somos 26 profesionales ecuatorianos y ecuatorianas que unimos nuestras capacidades para transformar comunidades a lo largo del Ecuador, a través de la innovación social, tecnológica y pública, buscamos alcanzar la sostenibilidad financiera y ambiental, fortaleciendo procesos socio-organizativos y ontribuyendo en la inclusión social y financiera para mejorar la calidad de vida de las personas en diversas localidades.',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' 
    },
    { 
      title: 'Nuestro Compromiso', 
      text: 'Nosotros contribuimos al desarrollo sostenible de Ecuador mediante la consolidación de un modelo empresarial basado en los valores fundamentales de la Economía Social y Solidaria:',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
      subItems: ['Reciprocidad', 'Responsabilidad', 'Redistribución'] // Subniveles en forma de lista
    }
  ];

  timelineEvents = [
    { year: '2018', description: 'Se promueve la idea de una asociación orientada a la capacitación en Economía Social y Solidaria.' },
    { year: '2019', description: 'Se contribuye al cuidado de las personas vinculadas a procesos asociativos durante la pandemia.' },
    { year: '2020', description: 'Se impulsan proyectos de reactivación económica a través de modelos asociativos.' },
    { year: '2021', description: 'Se fortalece capacidades en sostenibilidad para promover la reactivación económica.' },
    { year: '2022', description: 'Se fomenta el modelo asociativo como herramienta para la asistencia humanitaria y la integración de comunidades de acogida.' },
    { year: '2023', description: 'Se conforma la primera cooperativa de servicios de innovación y sostenibilidad: COOPSISA.' },
    { year: '2024', description: 'COOPSISA se consolida como pionera en la implementación de laboratorios de innovación para fortalecer los modelos asociativos de Economía Social y Solidaria.' },

  ];

  equipo = [
    { nombre: 'Juan Pérez', cargo: 'CEO', foto: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' },
    { nombre: 'Ana López', cargo: 'CTO', foto: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' },
    { nombre: 'Carlos Méndez', cargo: 'COO', foto: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' },
    { nombre: 'María García', cargo: 'CFO', foto: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' },
    { nombre: 'Juan Pérez', cargo: 'CEO', foto: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' },
    { nombre: 'Ana López', cargo: 'CTO', foto: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' },
    { nombre: 'Carlos Méndez', cargo: 'COO', foto: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' },
    { nombre: 'María García', cargo: 'CFO', foto: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' }
  ];

  membersLeft = [
    { role: 'Presidenta', icon: 'gold' }, // Representa liderazgo.
    { role: 'Secretaría', icon: 'file-text' }, // Representa documentos y registros.
    { role: 'Tesorera', icon: 'wallet' } // Representa manejo financiero.
  ];
  
  membersRight = [
    { role: 'Gerente General', icon: 'solution' }, // Representa gestión y soluciones.
    { role: 'Consejo de Vigilancia', icon: 'eye' }, // Representa supervisión y vigilancia.
    { role: 'Consejo de Administración', icon: 'team' } // Representa un grupo administrativo.
  ];
  

}
