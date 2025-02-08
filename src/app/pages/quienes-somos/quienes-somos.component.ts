import { ChangeDetectorRef, Component } from '@angular/core';
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
import { CarruselesService, CarruselData } from '../../services/carruseles/carruseles.service';
import { MembersService, MemberData } from '../../services/member/members.service';
import { EquipoService, EquipoData } from '../../services/equipo/equipo.service';

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
  slides: CarruselData[] = [];
  membersLeft: MemberData[] = [];
  membersRight: MemberData[] = [];
  equipo: EquipoData[] = [];

  constructor(
    private nosotrosService: NosotrosService,
    private timelineService: TimelineService,
    private carruselService: CarruselesService,
    private cdr: ChangeDetectorRef,
    private membersService: MembersService,
    private equipoService: EquipoService
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
      this.cdr.detectChanges();
    }, error => {
      console.error("Error al obtener los datos de Nosotros:", error);
    });

    // Obtener los datos del servicio TimelineService
    this.timelineService.getTimelineEvents().subscribe(data => {
      console.log(data); // Verifica que los datos sean correctos
      this.timelineEvents = data.sort((a, b) => {
        return parseInt(a.year, 10) - parseInt(b.year, 10);
      });
      this.cdr.detectChanges();
    }, error => {
      console.error("Error al obtener los datos de Timeline:", error);
    });
    // Obtener los datos del servicio CarruselesService
    this.carruselService.getSlides('job-foment').subscribe(
      (data) => {
        this.slides = data;
      },
      (error) => console.error('Error al obtener los carruseles:', error)
    );
    // Obtener miembros
    this.loadMembers();

    // Obtener miembros del equipo
    this.equipoService.getEquipoMembers().subscribe(data => {
      this.equipo = data;
      this.cdr.detectChanges();
    });
  }

  loadMembers() {
    this.membersService.getMembers().subscribe(members => {
      this.membersLeft = members
        .filter(m => m.group === 'left')
        .sort((a, b) => Number(a.order) - Number(b.order)); // Convertir y ordenar
  
      this.membersRight = members
        .filter(m => m.group === 'right')
        .sort((a, b) => Number(a.order) - Number(b.order)); // Convertir y ordenar
  
      this.cdr.detectChanges(); // Detectar cambios en la vista
    });
  }

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
