import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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
import { TranslationService } from '../../services/translation/translation.service';
import { Subscription } from 'rxjs';

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
    NzSpinModule,
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
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
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  currentLanguage = 'es';
  private languageSubscription!: Subscription;
  
  constructor(
    private sanitizer: DomSanitizer,
    private slideService: SlidesService,
    private ecosystemService: EcosystemService,
    private videoService: VideoService,
    private tarjetaService: TarjetaService,
    private laboratorioService: LaboratorioService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private translationService: TranslationService
  ) { }

  // Método para sanitizar la URL del video
  safeVideoUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
    this.languageSubscription = this.translationService.currentLanguage$.subscribe(
      lang => {
        this.currentLanguage = lang;
        this.loadEcosystemData();
        this.loadSlides();
        this.loadTarjetas();
        this.cdr.detectChanges();
      }
    );

    // Cargar videos
    this.videoService.getVideos().subscribe((videosData: VideoData[]) => {
      this.videos = videosData.map(video => ({
        id: video.id,
        url: video.url,
        description: video.description // ✅ Ahora sí incluye la descripción
      }));
      this.cdr.detectChanges();
    });

    // Cargar laboratorios de la colección seleccionada
    this.laboratorioService.getLaboratorios(this.selectedCollectionlab).subscribe({
      next: (laboratoriosData: Laboratorio[]) => {
        this.laboratorios = laboratoriosData;
        this.cdr.detectChanges(); // Se ejecuta después de asignar los datos
      },
      error: (error) => {
        console.error('Error al obtener los laboratorios:', error);
      }
    });
  }

  ngOnDestroy() {
    // Importante: siempre desuscribirse para evitar memory leaks
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  loadEcosystemData(): void {
    const collectionName = this.currentLanguage === 'es' ? 'ecosystem' : `ecosystem-en`;
    this.ecosystemService.getEcosystemItems(collectionName).subscribe({
      next: (data) => {
        this.ecosystemItems = data;
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error al obtener los elementos del ecosistema:', error)
    });
  }

  loadSlides(): void {
    const collectionName = this.currentLanguage === 'es' ? 'slides' : `slides-en`;
    this.slideService.getSlides( collectionName).subscribe((slidesData: SlideData[]) => {
      this.slides = slidesData.sort((a, b) => a.order - b.order);
      this.cdr.detectChanges();
      this.isLoading = false;
    });
  }

  loadTarjetas(): void {
    const collectionName = this.currentLanguage === 'es' ? 'tarjetas' : `tarjetas-en`;
    this.tarjetaService.getTarjetas(collectionName).subscribe((tarjetasData: TarjetaData[]) => {
      this.tarjetas = tarjetasData;
      this.cdr.detectChanges();
    });
  }

  isInternalRoute(route: string): boolean {
    return route.startsWith('/') && !route.startsWith('http');
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

  irEcosoistema(): void {
    // Redirigir a la página de ecosistema
    this.router.navigate(['/ecosistema']);
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }

}
