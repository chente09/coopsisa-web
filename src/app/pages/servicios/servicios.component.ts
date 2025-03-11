import { ChangeDetectorRef, Component } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CarruselesService, CarruselData } from '../../services/carruseles/carruseles.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { LaboratorioService } from '../../services/laboratorio/laboratorio.service';

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
  isModalVisibleLab: boolean = false;
  isModalVisibleEscuela: boolean = false;
  selectedLab: any = null;
  selectedEscuela: any = null;
  labCarruselSlides: any[] = []; // ✅ Declaramos la propiedad
  escuelasSlides: any[] = [];
  laboratorios: any[] = [];
  escuelas: any[] = [];
  negocios: any[] = [];



  constructor(
    private carruselService: CarruselesService,
    private laboratorioService: LaboratorioService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.carruselService.getSlides('lab-carrusel').subscribe(
      (data) => {
        this.labCarruselSlides = data; // ✅ Ahora esta propiedad existe
        this.cdr.detectChanges();
      },
      (error) => console.error('Error al obtener los carruseles de lab-carrusel:', error)
    );

    this.carruselService.getSlides('escuelas').subscribe(
      (data) => {
        this.escuelasSlides = data; // ✅ También para escuelas
        this.cdr.detectChanges();
      },
      (error) => console.error('Error al obtener los carruseles de escuelas:', error)
    );
    this.carruselService.getSlides('neg-solid').subscribe(
      (data) => {
        this.negocios = data; // ✅ También para escuelas
        this.cdr.detectChanges();
      },
      (error) => console.error('Error al obtener los carruseles de escuelas:', error)
    );

    this.laboratorioService.getLaboratorios('laboratorios').subscribe(
      (data) => {
        this.laboratorios = data; // ✅ Ahora esta propiedad existe
        this.cdr.detectChanges();
      },
      (error) => console.error('Error al obtener los laboratorios:', error)
    );

    this.laboratorioService.getLaboratorios('schol-tj').subscribe(
      (data) => {
        this.escuelas = data; // ✅ También para escuelas
        this.cdr.detectChanges();
      },
      (error) => console.error('Error al obtener las escuelas:', error)
    );
  }

  openModalLab(lab: any): void {
    this.selectedLab = lab;
    this.isModalVisibleLab = true;
  }
  
  openModalEscuela(escuela: any): void {
    this.selectedEscuela = escuela;
    this.isModalVisibleEscuela = true;
  }

  handleOk(): void {
    this.isModalVisibleLab = false; // Cerrar el modal de laboratorios
    setTimeout(() => {
      const section = document.getElementById("carouselExampleIndicators");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 400);
  }
  
  handleEsc(): void {
    this.isModalVisibleEscuela = false; // Cerrar el modal de escuelas
    setTimeout(() => {
      const section = document.getElementById("carouselIndicators2");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 400);
  }
  
  handleCancel(): void {
    this.isModalVisibleLab = false; // Cerrar ambos modales
    this.isModalVisibleEscuela = false;
  }
}
