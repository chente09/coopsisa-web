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
import { RouterModule } from '@angular/router';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NosotrosService, Nosotros } from '../../services/nosotros/nosotros.service';
import { TimelineEvent, TimelineService } from '../../services/timeline/timeline.service';

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
    NzIconModule,
    RouterModule,
    NzCollapseModule
  ],
  templateUrl: './quienes-somos.component.html',
  styleUrl: './quienes-somos.component.css'
})
export class QuienesSomosComponent {

  cards: Nosotros[] = [];
  timelineEvents: TimelineEvent[] = [];

  constructor(
    private nosotrosService: NosotrosService,
    private timelineService: TimelineService
  ) { }


  ngOnInit(): void {
    // Obtener los datos del servicio NosotrosService
    this.nosotrosService.getNosotros().subscribe(data => {
      console.log(data); // Verifica que los datos sean correctos
      this.cards = data.sort((a, b) => {
        const order = [
          '¿Quiénes somos?',
          'Nuestros Principios',
          'Nuestro Equipo',
          'Nuestro Compromiso'
        ];
        return order.indexOf(a.title) - order.indexOf(b.title);
      });
    }, error => {
      console.error("Error al obtener los datos de Nosotros:", error);
    });

    // Obtener los datos del servicio TimelineService
    this.timelineService.getTimelineEvents().subscribe(data => {
      console.log(data); // Verifica que los datos sean correctos
      this.timelineEvents = data.sort((a, b) => {
        return parseInt(a.year, 10) - parseInt(b.year, 10);
      });
    }, error => {
      console.error("Error al obtener los datos de Timeline:", error);
    });
  }

  

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

  items = [
    {
      title: 'Reciprocidad',
      description: 'Reportes financieros y de impacto organizados por proyecto o institución.',
      reportTitle: 'Reporte financiero 2024',
      reportUrl: 'https://heyzine.com/flip-book/b0c3dffbc9.html'
    },
    {
      title: 'Redistribución',
      description: 'Reconocimientos y estándares cumplidos (sostenibilidad, transparencia financiera).',
      reportTitle: 'Reporte financiero 2024',
      reportUrl: 'https://heyzine.com/flip-book/b0c3dffbc9.html'
    },
    {
      title: 'Responsabilidad',
      description: 'KPI que reflejan el impacto medible.',
      reportTitle: 'Reporte financiero 2024',
      reportUrl: 'https://heyzine.com/flip-book/b0c3dffbc9.html'
    }
  ];

}
