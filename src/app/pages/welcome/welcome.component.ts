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
import { SlidesService, SlideData } from '../../services/SlideData/slides.service';
import { EcosystemService, EcosystemData } from '../../services/ecosystem/ecosystem.service';
import { VideoService, VideoData } from '../../services/video/video.service';
import { TarjetaService, TarjetaData } from '../../services/tarjetas/tarjeta.service';
import { LaboratorioService, Laboratorio } from '../../services/laboratorio/laboratorio.service';
import { ChangeDetectorRef } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { forkJoin } from 'rxjs';

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
    NzListModule,
    NzSpinModule
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  isModalVisible = false;
  selectedLab: any = null;
  slides: SlideData[] = [];
  ecosystemItems: EcosystemData[] = [];
  videos: VideoData[] = [];
  tarjetas: TarjetaData[] = [];
  laboratorios: Laboratorio[] = [];
  selectedCollectionlab: string = 'laboratorios';
  isLoading = true; 

  constructor(
    private sanitizer: DomSanitizer,
    private slideService: SlidesService,
    private ecosystemService: EcosystemService,
    private videoService: VideoService,
    private tarjetaService: TarjetaService,
    private laboratorioService: LaboratorioService,
    private cdr: ChangeDetectorRef 
  ) { }

  // Método para sanitizar la URL del video
  safeVideoUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
    
    // Llamamos al servicio para obtener los slides cuando el componente se inicializa
    this.slideService.getSlides().subscribe((slidesData: SlideData[]) => {
      this.slides = slidesData;
      this.cdr.detectChanges();
      this.isLoading = false;
    });

    // Llamamos al servicio para obtener los items de la ecosistema cuando el componente se inicializa
    this.ecosystemService.getEcosystemItems().subscribe((itemsData: EcosystemData[]) => {
      this.ecosystemItems = itemsData;
      this.cdr.detectChanges();
      this.isLoading = false;
    })

    // Cargar videos
    this.videoService.getVideos().subscribe((videosData: VideoData[]) => {
      this.videos = videosData.map(video => ({
        id: video.id,
        url: video.url,
        description: video.description // ✅ Ahora sí incluye la descripción
      }));
      this.cdr.detectChanges();
      this.isLoading = false;
    });

    // Cargar tarjetas
    this.tarjetaService.getTarjetas().subscribe((tarjetasData: TarjetaData[]) => {
      this.tarjetas = tarjetasData;
      this.cdr.detectChanges();
      this.isLoading = false;
    });

    // Cargar laboratorios de la colección seleccionada
    this.laboratorioService.getLaboratorios(this.selectedCollectionlab).subscribe({
      next: (laboratoriosData: Laboratorio[]) => {
        this.laboratorios = laboratoriosData;
        this.cdr.detectChanges(); // Se ejecuta después de asignar los datos
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener los laboratorios:', error);
      }
    });
    


  }


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
