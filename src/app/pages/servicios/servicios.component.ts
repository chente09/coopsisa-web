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

interface Laboratorio {
  titulo: string;
  descripcion: string;
  icono: string;
  // Agrega más propiedades según necesites
}

interface Escuela {
  titulo: string;
  descripcion: string;
  icono: string;
  // Agrega más propiedades según necesites
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

  constructor(
    private carruselService: CarruselesService,
    private laboratorioService: LaboratorioService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.carruselService.getSlides('lab-carrusel').subscribe({
      next: (data) => {
        this.labCarruselSlides = data.sort((a, b) => a.order - b.order);
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error al obtener los carruseles de lab-carrusel:', error)
    });

    this.carruselService.getSlides('escuelas').subscribe({
      next: (data) => {
        this.escuelasSlides = data.sort((a, b) => a.order - b.order);
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error al obtener los carruseles de escuelas:', error)
    });

    this.carruselService.getSlides('neg-solid').subscribe({
      next: (data) => {
        this.negocios = data.sort((a, b) => a.order - b.order);
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error al obtener los carruseles de escuelas:', error)
    });

    this.laboratorioService.getLaboratorios('laboratorios').subscribe({
      next: (data) => {
        this.laboratorios = data.sort((a, b) => a.order - b.order);
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error al obtener los laboratorios:', error)
    });

    this.laboratorioService.getLaboratorios('schol-tj').subscribe({
      next: (data) => {
        this.escuelas = data.sort((a, b) => a.order - b.order);
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error al obtener las escuelas:', error)
    });
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