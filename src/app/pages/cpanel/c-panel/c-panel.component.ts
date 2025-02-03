import { Component } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// 🛠 Importar módulos de Ng-Zorro Ant Design
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { NzProgressModule } from 'ng-zorro-antd/progress';

import { NzMessageService } from 'ng-zorro-antd/message';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';


import { LogoService } from '../../../services/logo/logo.service';
import { SlidesService, SlideData } from '../../../services/SlideData/slides.service';
import { EcosystemService, EcosystemData } from '../../../services/ecosystem/ecosystem.service';
import { VideoService } from '../../../services/video/video.service';
import { TarjetaService, TarjetaData } from '../../../services/tarjetas/tarjeta.service';
import { LaboratorioService, Laboratorio } from '../../../services/laboratorio/laboratorio.service';
import { NosotrosService, Nosotros } from '../../../services/nosotros/nosotros.service';
import { TimelineService, TimelineEvent } from '../../../services/timeline/timeline.service';
import { CarruselesService, CarruselData } from '../../../services/carruseles/carruseles.service';

@Component({
  selector: 'app-c-panel',
  imports: [
    NzLayoutModule,
    NzMenuModule,
    CommonModule,
    NzIconModule,
    NzButtonModule,
    NzFormModule,
    NzCardModule,
    NzInputModule,
    NzUploadModule,
    NzSpinModule,
    NzMessageModule,
    NzPopconfirmModule,
    NzDividerModule,
    NzTableModule,
    FormsModule,
    ReactiveFormsModule,
    NzProgressModule
  ],
  providers: [NzModalService],
  templateUrl: './c-panel.component.html',
  styleUrl: './c-panel.component.css'
})
export class CPanelComponent {
  selectedKey = '1'; // Por defecto, la primera opción
  // ******* 📌 Admin Logos ********
  selectedFile: File | null = null;
  uploading: boolean = false;
  logos: { id: string, url: string, name: string }[] = [];
  selectedLogo: string = '';
  newLogoName: string = '';
  imagePreview: string | null = null;
  // ******* 📌 Admin Slides ********
  slides: SlideData[] = [];
  newSlide: Partial<SlideData> = { image: '', text: '', buttonText: '', route: '' };
  editingSlideId: string | null = null;
  selectedSlideFile: File | null = null;
  isSubmitting: boolean = false;
  // ******* 📌 Admin Ecosystem ********
  ecosystemItems: EcosystemData[] = [];
  newItem: EcosystemData = { title: '', description: '', image: '' };
  editingItemId: string | null = null;
  selectedItemFile: File | null = null;
  // ******* 📌 Admin Video ********
  selectedVideoFile: File | null = null;
  uploadingVideo: boolean = false;
  videos: { id: string, url: string, name: string }[] = [];
  uploadProgress: number = 0; // Estado de progreso
  // ******* 📌 Admin Tarjeta ********
  tarjetas: TarjetaData[] = [];
  newItem2: TarjetaData = { titulo: '', ruta: '', imagen: '' };
  editingItemId2: string | null = null;
  selectedItemFile2: File | null = null;
  // ******* 📌 Admin Laboratorio ********
  laboratorios: Laboratorio[] = [];
  newLaboratorio: Partial<Laboratorio> = {
    titulo: '',
    descripcion: '',
    icono: '',
    image: ''
  };
  editingLaboratorioId: string | null = null;
  selectedLaboratorioFile: File | null = null;
  // ******* 📌 Admin Nosotros ********
  nosotrosList: Nosotros[] = [];
  newNosotros: Partial<Nosotros> = {
    title: '',
    text: '',
    image: '',
    subItems: ''
  };
  editingNosotrosId: string | null = null;
  selectedNosotrosFile: File | null = null;
  // ******* 📌 Admin TimeLine ********
  timelineEvents: TimelineEvent[] = [];
  newEvent: TimelineEvent = { year: '', description: '' };
  editingEventId: string | null | undefined = null;
  // ******* 📌 Admin Carrusel ********
  carrusel: CarruselData[] = [];
  newCarruselSlide: CarruselData = { image: '', text: '' };
  selectedCarruselFile: File | null = null;
  selectedCollection: string = 'defaultCollection'; // Cambia esto según la colección
  editingCarruselId: string | null = null;


  constructor(
    private router: Router,
    private userService: UsersService,
    private logoService: LogoService,
    private message: NzMessageService,
    private slideService: SlidesService,
    private ecosystemService: EcosystemService,
    private videoService: VideoService,
    private tarjetaService: TarjetaService,
    private laboratorioService: LaboratorioService,
    private nosotrosService: NosotrosService,
    private timelineService: TimelineService,
    private carruselService: CarruselesService
  ) {
    
  }

  ngOnInit() {
    this.logoService.getLogos().subscribe((logos: any) => {
      this.logos = logos;
    });

    this.logoService.currentLogo.subscribe(url => {
      this.selectedLogo = url;
    });

    // Cargar slides al iniciar
    this.slideService.getSlides().subscribe(slides => {
      this.slides = slides;
    });

    this.getEcosystemData();
    this.loadVideos();
    this.getTarjetasData();
    this.getLaboratorios();
    this.getNosotros();
    this.getTimelineEvents();
    this.loadCarruseles();
  }

  // 📌 Verificar si el usuario está logueado
  isLogged(): boolean {
    return this.userService.getCurrentUser() !== null;
  }
  logout(): void {
    // Limpiar la sesión en el servicio
    this.userService.logout();

    // Redirigir al usuario a la página de inicio o de login
    this.router.navigate(['/cpanel-login']).then(() => {
      // Forzar la recarga de la página
      window.location.reload();
    });
  }
  // ******* 📌 Admin Logos ********

  /** 📌 Función para manejar la carga de archivos */
  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return; // No se seleccionó ningún archivo
    }

    const file = input.files[0];
    const fileName = file.name;

    try {
      const url = await this.logoService.uploadLogo(file, fileName);
      await this.logoService.changeLogo({ url, name: fileName });
      console.log('Logo actualizado con éxito:', url);
    } catch (error) {
      console.error('Error subiendo el logo:', error);
    }
  }

  selectSection(key: string): void {
    this.selectedKey = key;
  }
  // Función para interceptar la carga automática y almacenar el archivo
  beforeUpload = (file: NzUploadFile): boolean => {
    if (file.originFileObj) {
      this.selectedFile = file.originFileObj as File;
      console.log('Archivo almacenado:', this.selectedFile);
    } else {
      console.warn('No se pudo obtener el archivo');
    }
    return false; // Evita la carga automática
  };
  uploadLogo() {
    console.log('Archivo seleccionado para subir:', this.selectedFile); // Debugging

    if (!this.selectedFile) {
      this.message.warning('Por favor, selecciona un archivo.');
      return;
    }

    this.uploading = true;

    this.logoService.uploadLogo(this.selectedFile, this.selectedFile.name)
      .then(url => {
        this.uploading = false;
        this.selectedFile = null;
        this.message.success('Logo subido correctamente.');
      })
      .catch(error => {
        this.uploading = false;
        this.message.error('Error al subir el logo.');
      });
  }
  /** Establecer un logo como principal */
  setAsLogo(logo: { id: string, url: string, name: string }) {
    this.logoService.changeLogo(logo).then(() => {
      this.message.success('Logo establecido como principal.');
    }).catch(error => {
      this.message.error('Error al cambiar el logo.');
      console.error('Error cambiando el logo:', error);
    });
  }
  /** Eliminar un logo */
  deleteLogo(logo: { id: string, url: string, name: string }) {
    if (confirm(`¿Estás seguro de eliminar el logo "${logo.name}"?`)) {
      this.logoService.deleteLogo(logo.id).then(() => {
        this.message.success('Logo eliminado correctamente.');
      }).catch(error => {
        this.message.error('Error al eliminar el logo.');
        console.error('Error eliminando el logo:', error);
      });
    }
  }

  // ******* 📌 Admin Slides ********

  // Manejar la selección de archivos
  onSlideFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedSlideFile = event.target.files[0];
    }
  }

  async submitSlide() {
    if (!this.newSlide.text || !this.newSlide.buttonText || !this.newSlide.route) {
      this.message.warning('Por favor, completa todos los campos.');
      return;
    }

    // Validar que haya imagen si es un nuevo slide
    if (!this.editingSlideId && !this.selectedSlideFile) {
      this.message.warning('Debes seleccionar una imagen.');
      return;
    }

    this.isSubmitting = true;

    try {
      let imageUrl = this.newSlide.image;

      // Si hay una nueva imagen seleccionada, súbela
      if (this.selectedSlideFile) {
        imageUrl = await this.slideService.uploadImage(this.selectedSlideFile);
      }

      if (this.editingSlideId) {
        // Editar slide existente
        await this.slideService.updateSlide(this.editingSlideId, {
          image: imageUrl!,
          text: this.newSlide.text!,
          buttonText: this.newSlide.buttonText!,
          route: this.newSlide.route!
        });
        this.message.success('Slide actualizado correctamente.');
      } else {
        // Crear un nuevo slide
        await this.slideService.saveSlide({
          image: imageUrl!,
          text: this.newSlide.text!,
          buttonText: this.newSlide.buttonText!,
          route: this.newSlide.route!
        });
        this.message.success('Slide agregado correctamente.');
      }

      // Resetear formulario
      this.resetSlideForm();
    } catch (error) {
      console.error('Error al guardar el slide:', error);
      this.message.error('Error al guardar el slide.');
    } finally {
      this.isSubmitting = false;
    }
  }

  startEditSlide(slide: SlideData) {
    this.editingSlideId = slide.id!;
    this.newSlide = {
      image: slide.image,
      text: slide.text,
      buttonText: slide.buttonText,
      route: slide.route
    };
  }

  cancelEditSlide() {
    this.resetSlideForm();
  }

  async deleteSlide(slideId: string) {
    if (confirm('¿Estás seguro de eliminar este slide?')) {
      try {
        await this.slideService.deleteSlide(slideId);
        this.message.success('Slide eliminado correctamente.');
      } catch (error) {
        console.error('Error al eliminar el slide:', error);
        this.message.error('Error al eliminar el slide.');
      }
    }
  }

  private resetSlideForm() {
    this.newSlide = { image: '', text: '', buttonText: '', route: '' };
    this.editingSlideId = null;
    this.selectedSlideFile = null;
  }

  onSlideFileSelected(event: { file: NzUploadFile }) {
    if (event.file) {
      this.selectedSlideFile = event.file as any;
    }
  }

  async updateSlide(slideId: string, updatedData: Partial<SlideData>) {
    try {
      await this.slideService.updateSlide(slideId, updatedData);
      this.message.success('Slide actualizado correctamente.');
      this.editingSlideId = null;
    } catch (error) {
      console.error('Error al actualizar el slide:', error);
      this.message.error('Error al actualizar el slide.');
    }
  }

  // ******* 📌 Admin Ecosystem ********
  // Obtener los elementos del ecosistema
  getEcosystemData(): void {
    this.ecosystemService.getEcosystemItems().subscribe(data => {
      this.ecosystemItems = data;
    });
  }

  // Manejar la selección de archivos
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedItemFile = event.target.files[0];
    }
  }

  // Crear o editar un item del ecosistema
  async submitItem(): Promise<void> {
    if (!this.newItem.title || !this.newItem.description) {
      this.message.warning('Por favor, completa todos los campos.');
      return;
    }

    if (!this.editingItemId && !this.selectedItemFile) {
      this.message.warning('Debes seleccionar una imagen.');
      return;
    }

    this.isSubmitting = true;

    try {
      let imageUrl = this.newItem.image;

      // Si hay una nueva imagen seleccionada, súbela
      if (this.selectedItemFile) {
        imageUrl = await this.ecosystemService.uploadImage(this.selectedItemFile);
      }

      if (this.editingItemId) {
        // Editar item existente
        await this.ecosystemService.updateEcosystemItem(this.editingItemId, {
          image: imageUrl!,
          title: this.newItem.title!,
          description: this.newItem.description!
        });
        this.message.success('Elemento del ecosistema actualizado correctamente.');
      } else {
        // Crear un nuevo item
        await this.ecosystemService.saveEcosystemItem({
          image: imageUrl!,
          title: this.newItem.title!,
          description: this.newItem.description!
        });
        this.message.success('Elemento del ecosistema agregado correctamente.');
      }

      this.resetForm();
    } catch (error) {
      console.error('Error al guardar el item:', error);
      this.message.error('Error al guardar el item.');
    } finally {
      this.isSubmitting = false;
    }
  }

  // Iniciar la edición de un item
  startEditItem(item: EcosystemData): void {
    this.editingItemId = item.id!;
    this.newItem = { title: item.title, description: item.description, image: item.image };
  }

  // Cancelar la edición y resetear el formulario
  cancelEditItem(): void {
    this.resetForm();
  }

  // Eliminar un item del ecosistema
  async deleteItem(itemId: string): Promise<void> {
    if (confirm('¿Estás seguro de eliminar este elemento del ecosistema?')) {
      try {
        await this.ecosystemService.deleteEcosystemItem(itemId);
        this.message.success('Elemento del ecosistema eliminado correctamente.');
      } catch (error) {
        console.error('Error al eliminar el item:', error);
        this.message.error('Error al eliminar el item.');
      }
    }
  }

  // Resetear el formulario
  private resetForm(): void {
    this.newItem = { title: '', description: '', image: '' };
    this.editingItemId = null;
    this.selectedItemFile = null;
  }

  // ******* 📌 Admin Video ********
  loadVideos() {
    this.videoService.getVideos().subscribe(videos => {
      this.videos = videos.map(video => ({
        id: video.id!,
        url: video.url,
        name: video.id || 'Desconocido'
      }));
    });
  }

  /** 📌 Manejar la selección de archivos */
  onVideoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return; // No se seleccionó ningún archivo
    }
    this.selectedVideoFile = input.files[0];
  }

  /** 📌 Subir video */
  async uploadVideo() {
    if (!this.selectedVideoFile) {
      this.message.warning('Por favor, selecciona un video.');
      return;
    }

    this.uploadingVideo = true;
    this.uploadProgress = 0; // Reiniciar progreso

    try {
      // Simulación de carga con intervalos (Reemplaza con la lógica real de progreso)
      const interval = setInterval(() => {
        if (this.uploadProgress < 90) {
          this.uploadProgress += 10; // Aumenta el progreso
        }
      }, 500);

      const videoId = await this.videoService.saveVideo(this.selectedVideoFile, (progress) => {
        this.uploadProgress = progress; // Usa el progreso real si está disponible
      });

      clearInterval(interval); // Detener la simulación cuando termine
      this.uploadProgress = 100; // Completar la barra
      this.message.success('Video subido correctamente.');

      this.selectedVideoFile = null;
      this.loadVideos(); // Recargar la lista de videos
    } catch (error) {
      console.error('Error al subir el video:', error);
      this.message.error('Error al subir el video.');
    } finally {
      setTimeout(() => {
        this.uploadingVideo = false;
        this.uploadProgress = 0; // Resetear la barra después de subir
      }, 1000);
    }
  }

  /** 📌 Eliminar un video */
  async deleteVideo(video: { id: string; url: string; name: string }) {
    if (confirm(`¿Estás seguro de eliminar este video?`)) {
      try {
        await this.videoService.deleteVideo(video.id, video.name);
        this.message.success('Video eliminado correctamente.');
        this.loadVideos(); // Recargar la lista
      } catch (error) {
        console.error('Error al eliminar el video:', error);
        this.message.error('Error al eliminar el video.');
      }
    }
  }

  // ******* 📌 Admin Tarjetas ********
  // Obtener las tarjetas
  getTarjetasData(): void {
    this.tarjetaService.getTarjetas().subscribe(data => { // ✅ Llamada correcta al servicio
      this.tarjetas = data;
    });
  }

  // Manejar la selección de archivos
  onFileChange2(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedItemFile2 = event.target.files[0]; // ✅ Corrección: usar selectedItemFile2
    }
  }

  // Crear o editar una tarjeta
  async submitTarjeta(): Promise<void> {
    if (!this.newItem2.titulo || !this.newItem2.ruta) {
      this.message.warning('Por favor, completa todos los campos.');
      return;
    }

    if (!this.editingItemId2 && !this.selectedItemFile2) {
      this.message.warning('Debes seleccionar una imagen.');
      return;
    }

    this.isSubmitting = true;

    try {
      let imageUrl = this.newItem2.imagen;

      // Si hay una nueva imagen seleccionada, súbela
      if (this.selectedItemFile2) {
        imageUrl = await this.tarjetaService.uploadImage(this.selectedItemFile2); // ✅ Corrección: llamada correcta al servicio
      }

      if (this.editingItemId2) {
        // Editar tarjeta existente
        await this.tarjetaService.updateTarjeta(this.editingItemId2, {
          imagen: imageUrl!,
          titulo: this.newItem2.titulo!,
          ruta: this.newItem2.ruta!
        });
        this.message.success('Tarjeta actualizada correctamente.');
      } else {
        // Crear una nueva tarjeta
        await this.tarjetaService.saveTarjeta({
          imagen: imageUrl!,
          titulo: this.newItem2.titulo!,
          ruta: this.newItem2.ruta!
        });
        this.message.success('Tarjeta agregada correctamente.');
      }

      this.resetForm2();
    } catch (error) {
      console.error('Error al guardar la tarjeta:', error);
      this.message.error('Error al guardar la tarjeta.');
    } finally {
      this.isSubmitting = false;
    }
  }

  // Iniciar la edición de una tarjeta
  startEditTarjeta(item: TarjetaData): void {
    this.editingItemId2 = item.id!;
    this.newItem2 = { titulo: item.titulo, ruta: item.ruta, imagen: item.imagen };
  }

  // Cancelar la edición y resetear el formulario
  cancelEditTarjeta(): void {
    this.resetForm2();
  }

  // Eliminar una tarjeta
  async deleteTarjetaItem(itemId: string): Promise<void> {
    if (confirm('¿Estás seguro de eliminar esta tarjeta?')) {
      try {
        await this.tarjetaService.deleteTarjeta(itemId); // ✅ Corrección: llamada correcta al servicio
        this.message.success('Tarjeta eliminada correctamente.');
      } catch (error) {
        console.error('Error al eliminar la tarjeta:', error);
        this.message.error('Error al eliminar la tarjeta.');
      }
    }
  }

  // Resetear el formulario
  private resetForm2(): void {
    this.newItem2 = { titulo: '', ruta: '', imagen: '' };
    this.editingItemId2 = null;
    this.selectedItemFile2 = null;
  }

  // ******* 📌 Admin Laboratorios ********
  // ✅ Obtener los laboratorios desde Firestore
  getLaboratorios(): void {
    this.laboratorioService.getLaboratorios().subscribe(data => {
      this.laboratorios = data;
    });
  }

  // ✅ Manejar la selección de archivos
  onLaboratorioFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedLaboratorioFile = event.target.files[0];
    }
  }

  // ✅ Crear o editar un laboratorio
  async submitLaboratorio(): Promise<void> {
    if (!this.newLaboratorio.titulo || !this.newLaboratorio.descripcion || !this.newLaboratorio.icono) {
      this.message.warning('Por favor, completa todos los campos.');
      return;
    }

    if (!this.editingLaboratorioId && !this.selectedLaboratorioFile) {
      this.message.warning('Debes seleccionar una imagen.');
      return;
    }

    this.isSubmitting = true;

    try {
      let imageUrl = this.newLaboratorio.image;

      // Si hay una nueva imagen seleccionada, súbela a Firebase Storage
      if (this.selectedLaboratorioFile) {
        imageUrl = await this.laboratorioService.uploadImage(this.selectedLaboratorioFile);
      }

      if (this.editingLaboratorioId) {
        // Editar laboratorio existente
        await this.laboratorioService.updateLaboratorio(this.editingLaboratorioId, {
          image: imageUrl!,
          titulo: this.newLaboratorio.titulo!,
          descripcion: this.newLaboratorio.descripcion!,
          icono: this.newLaboratorio.icono!
        });
        this.message.success('Laboratorio actualizado correctamente.');
      } else {
        // Crear un nuevo laboratorio
        await this.laboratorioService.saveLaboratorio({
          image: imageUrl!,
          titulo: this.newLaboratorio.titulo!,
          descripcion: this.newLaboratorio.descripcion!,
          icono: this.newLaboratorio.icono!
        });
        this.message.success('Laboratorio agregado correctamente.');
      }

      this.resetLaboratorioForm();
    } catch (error) {
      console.error('Error al guardar el laboratorio:', error);
      this.message.error('Error al guardar el laboratorio.');
    } finally {
      this.isSubmitting = false;
    }
  }

  // ✅ Iniciar la edición de un laboratorio
  startEditLaboratorio(laboratorio: Laboratorio): void {
    this.editingLaboratorioId = laboratorio.id!;
    this.newLaboratorio = {
      titulo: laboratorio.titulo,
      descripcion: laboratorio.descripcion,
      icono: laboratorio.icono,
      image: laboratorio.image
    };
  }

  // ✅ Cancelar la edición y resetear el formulario
  cancelEditLaboratorio(): void {
    this.resetLaboratorioForm();
  }

  // ✅ Eliminar un laboratorio
  async deleteLaboratorio(laboratorioId: string): Promise<void> {
    if (confirm('¿Estás seguro de eliminar este laboratorio?')) {
      try {
        await this.laboratorioService.deleteLaboratorio(laboratorioId);
        this.message.success('Laboratorio eliminado correctamente.');
      } catch (error) {
        console.error('Error al eliminar el laboratorio:', error);
        this.message.error('Error al eliminar el laboratorio.');
      }
    }
  }

  // ✅ Resetear el formulario
  private resetLaboratorioForm(): void {
    this.newLaboratorio = { titulo: '', descripcion: '', icono: '', image: '' };
    this.editingLaboratorioId = null;
    this.selectedLaboratorioFile = null;
  }

  // ******* 📌 Admin Nosotros ********  
  // ✅ Obtener los elementos de "Nosotros" desde Firestore  
  getNosotros(): void {
    this.nosotrosService.getNosotros().subscribe(data => {
      this.nosotrosList = data;
    });
  }
  // ✅ Manejar la selección de archivos  

  onNosotrosFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedNosotrosFile = event.target.files[0];
    }
  }

  // ✅ Crear o editar un elemento en "Nosotros"  
  async submitNosotros(): Promise<void> {
    if (!this.newNosotros.title || !this.newNosotros.text) {
      this.message.warning('Por favor, completa todos los campos.');
      return;
    }

    if (!this.editingNosotrosId && !this.selectedNosotrosFile) {
      this.message.warning('Debes seleccionar una imagen.');
      return;
    }

    this.isSubmitting = true;

    try {
      let imageUrl = this.newNosotros.image;

      // Si hay una nueva imagen seleccionada, súbela a Firebase Storage
      if (this.selectedNosotrosFile) {
        imageUrl = await this.nosotrosService.uploadImage(this.selectedNosotrosFile);
      }

      // Asegurar que `order` tenga un valor predeterminado (por ejemplo, 0)
      const orderValue = this.newNosotros.order !== undefined ? this.newNosotros.order : 0;

      const nosotrosData: Nosotros = {
        image: imageUrl!,
        title: this.newNosotros.title!,
        text: this.newNosotros.text!,
        subItems: this.newNosotros.subItems!,
        order: orderValue
      };

      if (this.editingNosotrosId) {
        // Editar elemento existente
        await this.nosotrosService.updateNosotros(this.editingNosotrosId, nosotrosData);
        this.message.success('Elemento actualizado correctamente.');
      } else {
        // Crear un nuevo elemento
        await this.nosotrosService.saveNosotros(nosotrosData);
        this.message.success('Elemento agregado correctamente.');
      }

      this.resetNosotrosForm();
    } catch (error) {
      console.error('Error al guardar el elemento:', error);
      this.message.error('Error al guardar el elemento.');
    } finally {
      this.isSubmitting = false;
    }
  }

  // ✅ Iniciar la edición de un elemento de "Nosotros"  
  startEditNosotros(nosotros: Nosotros): void {
    this.editingNosotrosId = nosotros.id!;
    this.newNosotros = {
      title: nosotros.title,
      text: nosotros.text,
      image: nosotros.image,
      subItems: nosotros.subItems
    };
  }

  // ✅ Cancelar la edición y resetear el formulario  
  cancelEditNosotros(): void {
    this.resetNosotrosForm();
  }

  // ✅ Eliminar un elemento de "Nosotros"  
  async deleteNosotros(nosotrosId: string): Promise<void> {
    if (confirm('¿Estás seguro de eliminar este elemento?')) {
      try {
        await this.nosotrosService.deleteNosotros(nosotrosId);
        this.message.success('Elemento eliminado correctamente.');
      } catch (error) {
        console.error('Error al eliminar el elemento:', error);
        this.message.error('Error al eliminar el elemento.');
      }
    }
  }

  // ✅ Resetear el formulario  
  private resetNosotrosForm(): void {
    this.newNosotros = { title: '', text: '', image: '', subItems: '' };
    this.editingNosotrosId = null;
    this.selectedNosotrosFile = null;
  }

  // ******* 📌 Admin Timeline ********  
  // ✅ Obtener los eventos de la línea de tiempo
  getTimelineEvents(): void {
    this.timelineService.getTimelineEvents().subscribe(data => {
      this.timelineEvents = data;
    });
  }

  // ✅ Crear o editar un evento
  async submitTimelineEvent(): Promise<void> {
    if (!this.newEvent.year || !this.newEvent.description) {
      this.message.warning('Por favor, completa todos los campos.');
      return;
    }

    this.isSubmitting = true;

    try {
      if (this.editingEventId) {
        // Editar el evento existente
        await this.timelineService.updateTimelineEvent(this.editingEventId, this.newEvent);
        this.message.success('Evento actualizado correctamente.');
      } else {
        // Crear un nuevo evento
        await this.timelineService.saveTimelineEvent(this.newEvent);
        this.message.success('Evento agregado correctamente.');
      }

      this.resetFormTime();
      this.getTimelineEvents();
    } catch (error) {
      console.error('Error al guardar el evento:', error);
      this.message.error('Error al guardar el evento.');
    } finally {
      this.isSubmitting = false;
    }
  }

  // ✅ Iniciar la edición de un evento
  startEditEvent(event: TimelineEvent): void {
    this.editingEventId = event.id ?? null; // Si event.id es undefined, asigna null
    this.newEvent = { ...event };
  }  

  cancelEditEvent(): void {
    // Limpiar el formulario y restablecer el id de edición
    this.editingEventId = null;
    this.newEvent = { year: '', description: '' };
  }

  // ✅ Eliminar un evento
  async deleteEvent(eventId: string): Promise<void> {
    if (confirm('¿Estás seguro de eliminar este evento?')) {
      try {
        await this.timelineService.deleteTimelineEvent(eventId);
        this.message.success('Evento eliminado correctamente.');
        this.getTimelineEvents();
      } catch (error) {
        console.error('Error al eliminar el evento:', error);
        this.message.error('Error al eliminar el evento.');
      }
    }
  }

  // ✅ Resetear el formulario
  private resetFormTime(): void {
    this.newEvent = { year: '', description: '' };
    this.editingEventId = null;
  }

  // ******* 📌 Admin Carruseles varios ********

  // Cargar los carruseles de la colección seleccionada
  loadCarruseles() {
    this.carruselService.getSlides(this.selectedCollection).subscribe(
      (slides) => {
        this.carrusel = slides; // Asignar los carruseles a la variable slides
      }
    );
  }

  // Guardar el carrusel (crear o actualizar)
  async submitCarrusel() {
    if (!this.newCarruselSlide.text) {
      this.message.warning('Por favor, completa todos los campos.');
      return;
    }

    this.isSubmitting = true;

    try {
      let imageUrl = this.newCarruselSlide.image;

      // Si hay una nueva imagen seleccionada, súbela
      if (this.selectedCarruselFile) {
        imageUrl = await this.carruselService.uploadImage(this.selectedCarruselFile);
      }

      if (this.editingCarruselId) {
        // Actualizar slide existente
        await this.carruselService.updateSlide(this.editingCarruselId, {
          image: imageUrl,
          text: this.newCarruselSlide.text
        }, this.selectedCollection);
        this.message.success('Carrusel actualizado correctamente.');
      } else {
        // Crear un nuevo slide
        await this.carruselService.saveSlide({
          image: imageUrl!,
          text: this.newCarruselSlide.text!
        }, this.selectedCollection);
        this.message.success('Carrusel agregado correctamente.');
      }

      this.resetCarruselForm();
      this.loadCarruseles();
    } catch (error) {
      console.error('Error al guardar el carrusel:', error);
      this.message.error('Error al guardar el carrusel.');
    } finally {
      this.isSubmitting = false;
    }
  }

  // Configurar el formulario para editar un carrusel
  startEditCarrusel(slide: CarruselData) {
    if (slide.id) {
      this.editingCarruselId = slide.id;
      this.newCarruselSlide = { ...slide };
    } else {
      this.message.error('Este carrusel no tiene un ID válido.');
    }
  }

  // Cancelar la edición de un carrusel
  cancelEditCarrusel() {
    this.editingCarruselId = null;
    this.resetCarruselForm();
  }

  // Eliminar un carrusel
  async deleteCarrusel(slideId: string) {
    try {
      await this.carruselService.deleteSlide(slideId, this.selectedCollection);
      this.message.success('Carrusel eliminado correctamente.');
      this.loadCarruseles();
    } catch (error) {
      console.error('Error al eliminar el carrusel:', error);
      this.message.error('Error al eliminar el carrusel.');
    }
  }

  // Manejar el cambio de archivo de imagen
  onCarruselFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedCarruselFile = input.files[0];
    }
  }

  // Resetear el formulario de carrusel
  resetCarruselForm() {
    this.newCarruselSlide = { image: '', text: '' };
    this.selectedCarruselFile = null;
    this.editingCarruselId = null;
  }
  

}


