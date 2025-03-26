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
import { TranslationService } from '../../services/translation/translation.service';
import { Subscription } from 'rxjs';

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

  currentLanguage = 'es';
  private languageSubscription!: Subscription;



  constructor(
    private nosotrosService: NosotrosService,
    private timelineService: TimelineService,
    private carruselService: CarruselesService,
    private cdr: ChangeDetectorRef,
    private membersService: MembersService,
    private equipoService: EquipoService,
    private translationService: TranslationService
  ) { }


  ngOnInit(): void {
    this.languageSubscription = this.translationService.currentLanguage$.subscribe({
      next: (lang) => {
        this.currentLanguage = lang;
        this.loadNosotros();
        this.loadTimeline();
        this.loadSlides();
        this.loadMembers();
        this.loadEquipo();
        this.cdr.detectChanges();
      }
    });

  }

  ngOnDestroy() {
    // Importante: siempre desuscribirse para evitar memory leaks
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  // Versión mejorada del método loadMembers()
  loadMembers(): void {

    const collectionName = this.currentLanguage === 'es' ? 'members' : `members-${this.currentLanguage}`;

    this.membersService.getMembers(collectionName).subscribe({
      next: (members) => {
        this.membersLeft = members
          .filter(m => m.group === 'left')
          .sort((a, b) => a.order - b.order);
        this.cdr.detectChanges();

        this.membersRight = members
          .filter(m => m.group === 'right')
          .sort((a, b) => a.order - b.order);

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar miembros:', error);
        this.cdr.detectChanges();
      }
    });
  }

  loadSlides(): void {
    const collectionName = this.currentLanguage === 'es' ? 'job-foment' : 'job-foment-en';

    this.carruselService.getSlides(collectionName).subscribe({
      next: (data) => {
        this.slides = data.sort((a, b) => a.order - b.order);
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error al obtener los carruseles:', error)
    });
  }

  loadNosotros(): void {
    const collectionName = this.currentLanguage === 'es' ? 'nosotros' : 'nosotros-en';

    this.nosotrosService.getNosotros(collectionName).subscribe({
      next: (data) => {
        this.cards = data.sort((a, b) => a.order - b.order);
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error al obtener los carruseles:', error)
    });
  }

  loadTimeline(): void {
    const collectionName = this.currentLanguage === 'es' ? 'timelineEvents' : 'timelineEvents-en';

    this.timelineService.getTimelineEvents(collectionName).subscribe({
      next: (data) => {
        this.timelineEvents = data.sort((a, b) => parseInt(a.year, 10) - parseInt(b.year, 10));
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error al obtener los carruseles:', error)
    });
  }

  loadEquipo(): void {
    const collectionName = this.currentLanguage === 'es' ? 'equipo' : 'equipo-en';

    this.equipoService.getEquipoMembers(collectionName).subscribe(data => {
      this.equipo = data;
      this.cdr.detectChanges();
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