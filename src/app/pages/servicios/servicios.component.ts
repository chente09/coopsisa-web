import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CarruselesService } from '../../services/carruseles/carruseles.service';
import { LaboratorioService } from '../../services/laboratorio/laboratorio.service';
import { TranslationService } from '../../services/translation/translation.service';
import { Subscription } from 'rxjs';

interface Laboratorio {
  titulo: string;
  descripcion: string;
  icono: string;
}

interface Escuela {
  titulo: string;
  descripcion: string;
  icono: string;
}

@Component({
  selector: 'app-servicios',
  standalone: true, // Agrega esto si estás usando Angular ≥14 con standalone components
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
export class ServiciosComponent implements OnInit {
  isModalVisibleLab = false;
  isModalVisibleEscuela = false;
  selectedLab: Laboratorio | null = null;
  selectedEscuela: Escuela | null = null;
  labCarruselSlides: any[] = [];
  escuelasSlides: any[] = [];
  laboratorios: Laboratorio[] = [];
  escuelas: Escuela[] = [];
  negocios: any[] = [];

  currentLanguage = 'es';
  private languageSubscription!: Subscription;

  constructor(
    private carruselService: CarruselesService,
    private laboratorioService: LaboratorioService,
    private cdr: ChangeDetectorRef,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {
    this.languageSubscription = this.translationService.currentLanguage$.subscribe(
      lang => {
        this.currentLanguage = lang;
        this.loadLaboratorios();
        this.loadEscuelas();
        this.loadSlideLab();
        this.loadSlideEscuela();
        this.loadSlideNegocio();
        this.cdr.detectChanges();
      }
    );
  }


  loadLaboratorios(): void {
    const collectionName = this.currentLanguage === 'es' ? 'laboratorios' : `laboratorios-en`;
    this.laboratorioService.getLaboratorios(collectionName).subscribe({
      next: (data) => {
        this.laboratorios = data.sort((a, b) => a.order - b.order);
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error al obtener los laboratorios:', error)
    });
  }

  loadEscuelas(): void {
    const collectionName = this.currentLanguage === 'es' ? 'schol-tj' : `schol-tj-en`;
    this.laboratorioService.getLaboratorios(collectionName).subscribe({
      next: (data) => {
        this.escuelas = data.sort((a, b) => a.order - b.order);
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error al obtener las escuelas:', error)
    });
  }

  loadSlideLab(): void {
    const collectionName = this.currentLanguage === 'es' ? 'lab-carrusel' : `lab-carrusel-en`;
    this.carruselService.getSlides(collectionName).subscribe({
      next: (data) => {
        this.labCarruselSlides = data.sort((a, b) => a.order - b.order);
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error al obtener los carruseles de lab-carrusel:', error)
    });
  }

  loadSlideEscuela(): void {
    const collectionName = this.currentLanguage === 'es' ? 'escuelas' : `escuelas-en`;
    this.carruselService.getSlides(collectionName).subscribe({
      next: (data) => {
        this.escuelasSlides = data.sort((a, b) => a.order - b.order);
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error al obtener los carruseles de escuela-carrusel:', error)
    });
  }

  loadSlideNegocio(): void {
    const collectionName = this.currentLanguage === 'es' ? 'neg-solid' : `neg-solid-en`;
    this.carruselService.getSlides(collectionName).subscribe({
      next: (data) => {
        this.negocios = data.sort((a, b) => a.order - b.order);
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error al obtener los carruseles de negocio-carrusel:', error)
    });
  }

  ngOnDestroy() {
    // Importante: siempre desuscribirse para evitar memory leaks
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
  
  openModalLab(lab: Laboratorio): void {
    console.log('Abriendo modal de laboratorio:', lab);
    this.selectedLab = lab;
    this.isModalVisibleLab = true;
    this.cdr.detectChanges(); // Forzar detección de cambios
  }
  
  openModalEscuela(escuela: Escuela): void {
    console.log('Abriendo modal de escuela:', escuela);
    this.selectedEscuela = escuela;
    this.isModalVisibleEscuela = true;
    this.cdr.detectChanges(); // Forzar detección de cambios
  }
  
  handleOk(): void {
    this.isModalVisibleLab = false;
    setTimeout(() => {
      const section = document.getElementById("carouselExampleIndicators");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 400);
  }
  
  handleEsc(): void {
    this.isModalVisibleEscuela = false;
    setTimeout(() => {
      const section = document.getElementById("carouselIndicators2");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 400);
  }
  
  handleCancel(): void {
    // Es mejor separar la lógica para tener más control
    if (this.isModalVisibleLab) {
      this.isModalVisibleLab = false;
    }
    
    if (this.isModalVisibleEscuela) {
      this.isModalVisibleEscuela = false;
    }
    
    this.cdr.detectChanges(); // Forzar detección de cambios
  }
}