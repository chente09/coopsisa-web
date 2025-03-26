import { ChangeDetectorRef, Component } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzListModule } from 'ng-zorro-antd/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UsersService } from '../../../services/users/users.service';
import { Router } from '@angular/router';


import { LogoService, Logo } from '../../../services/logo/logo.service';
import { SlidesService, SlideData } from '../../../services/SlideData/slides.service';
import { EcosystemService, EcosystemData } from '../../../services/ecosystem/ecosystem.service';
import { VideoService } from '../../../services/video/video.service';
import { TarjetaService, TarjetaData } from '../../../services/tarjetas/tarjeta.service';
import { LaboratorioService, Laboratorio } from '../../../services/laboratorio/laboratorio.service';
import { NosotrosService, Nosotros } from '../../../services/nosotros/nosotros.service';
import { TimelineService, TimelineEvent } from '../../../services/timeline/timeline.service';
import { CarruselesService, CarruselData } from '../../../services/carruseles/carruseles.service';
import { Observable } from 'rxjs/internal/Observable';
import { MembersService, MemberData } from '../../../services/member/members.service';
import { EquipoService, EquipoData } from '../../../services/equipo/equipo.service';
import { FilesService, EcosystemItem } from '../../../services/files/files.service';
import { Formulario } from '../../../services/formulario/formulario.service';
import { collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-c-panel',
  standalone: true,
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
    NzSelectModule,
    NzPopconfirmModule,
    NzDividerModule,
    NzTableModule,
    FormsModule,
    ReactiveFormsModule,
    NzProgressModule,
    NzListModule,
    RouterLink,
    RouterLinkActive
  ],
  providers: [NzModalService],
  templateUrl: './c-panel.component.html',
  styleUrl: './c-panel.component.css'
})
export class CPanelComponent {
  selectedKey = '0'; // Por defecto, la primera opción
  // ******* 📌 Admin Logos ********
  navbarLogo: string = '';
  footerLogo: string = '';
  navbarLogos: Logo[] = [];
  footerLogos: Logo[] = [];
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  uploading: boolean = false;
  // ******* 📌 Admin Slides ********
  slides: SlideData[] = [];
  newSlide: Partial<SlideData> = { image: '', text: '', buttonText: '', route: '' };
  editingSlideId: string | null = null;
  selectedSlideFile: File | null = null;
  isSubmitting: boolean = false;
  currentCollectionSlidesP = 'slides';
  collectionOptionsSlides = [
    { value: 'slides', label: 'Español (Principal)' },
    { value: 'slides-en', label: 'Inglés' },
  ]
  // ******* 📌 Admin Ecosystem ********
  ecosystemItems: EcosystemData[] = [];
  newItem: EcosystemData = { title: '', description: '', image: '' };
  editingItemId: string | null = null;
  selectedItemFile: File | null = null;
  currentCollectionEcosystem = 'nosotros'; 
  // Array de opciones de colección
  collectionOptionsEcosystem = [
    { value: 'ecosystem', label: 'Español (Principal)' },
    { value: 'ecosystem-en', label: 'Inglés' },
  ];

  // ******* 📌 Admin Video ********
  selectedVideoFile: File | null = null;
  videoDescription: string = '';
  uploadingVideo: boolean = false;
  videos: { id: string; url: string; name: string; description: string; }[] = [];
  uploadProgress: number = 0; // Estado de progreso
  // ******* 📌 Admin Tarjeta ********
  tarjetas: TarjetaData[] = [];
  newItem2: TarjetaData = { titulo: '', ruta: '', imagen: '' };
  editingItemId2: string | null = null;
  selectedItemFile2: File | null = null;
  currentCollectionTarjetas = 'tarjetas';
  // Array de opciones de colección
  collectionOptionsTarjetas = [
    { value: 'tarjetas', label: 'Español (Principal)' },
    { value: 'tarjetas-en', label: 'Inglés' },
  ]
  // ******* 📌 Admin Laboratorio ********
  laboratorios: Laboratorio[] = [];
  newLaboratorio: Partial<Laboratorio> = {
    titulo: '',
    descripcion: '',
    icono: '',
    image: '',
    order: 0
  };
  editingLaboratorioId: string | null = null;
  selectedLaboratorioFile: File | null = null;
  selectedCollectionlab: string = 'laboratorios'; // Valor por defecto
  // ******* 📌 Admin Nosotros ********
  nosotrosList: Nosotros[] = [];
  newNosotros: Partial<Nosotros> = {
    order: 0,
    title: '',
    text: '',
    image: '',
    subItems: ''
  };
  editingNosotrosId: string | null = null;
  selectedNosotrosFile: File | null = null;
  currentCollection = 'nosotros'; 
  // Array de opciones de colección
  collectionOptions = [
    { value: 'nosotros', label: 'Español (Principal)' },
    { value: 'nosotros-en', label: 'Inglés' },
    // Puedes agregar más colecciones según necesites
  ];

  // ******* 📌 Admin TimeLine ********
  timelineEvents: TimelineEvent[] = [];
  newEvent: TimelineEvent = { year: '', description: '' };
  editingEventId: string | null | undefined = null;
  currentCollectionTimeline = 'timelineEvents'; // Colección por defecto
  isLoading = false;
  collectionOptionsTimeline = [
    { value: 'timelineEvents', label: 'Español (Principal)' },
    { value: 'timelineEvents-en', label: 'Inglés' },
    // Puedes agregar más colecciones según necesites
  ];
  // ******* 📌 Admin Carrusel ********
  selectedCollection: string = ''; // Colección seleccionada
  fileToUpload: File | null = null; // Archivo de imagen a subir
  carruseles$: Observable<any> = new Observable(); // Observable para los carruseles
  editingCarruselId: string | null = null; // ID del carrusel en edición
  newCarrusel: CarruselData = {
    image: '',
    text: '',
    description: '',
    order: 0
  };
  // ******* 📌 Admin Members ********
  members$: Observable<MemberData[]> = new Observable();
  membersLeft: MemberData[] = [];
  membersRight: MemberData[] = [];
  editingMemberId: string | null = null;
  newMember: MemberData = { role: '', order: 0, icon: '', group: 'left' };
  // Configuración para múltiples colecciones
  currentCollectionMembers = 'members'; // Colección por defecto
  collectionOptionsMembers = [
    { value: 'members', label: 'Español (Principal)' },
    { value: 'members-en', label: 'Inglés' },
  ];
  // ******* 📌 Admin Equipo ********
  equipo: EquipoData[] = [];
  nuevoMiembro: Partial<EquipoData> = { nombre: '', cargo: '', foto: '' };
  editandoMiembroId: string | null = null;
  archivoSeleccionado: File | null = null;
  // Configuración para múltiples colecciones
  currentCollectionEquipo = 'equipo'; // Colección por defecto
  collectionOptionsEquipo = [
    { value: 'equipo', label: 'Español (Principal)' },
    { value: 'equipo-en', label: 'Inglés' },
    // Agrega más colecciones según necesites
  ];
  // ******* 📌 Admin Files ********
  ecosystemDocuments: EcosystemItem[] = [];
  newdocument: EcosystemItem = { title: '', description: '', imageUrl: '', fileUrl: '' };
  imageDocument: File | null = null;
  documentFile: File | null = null;
  isSubmittingDocs = false;
  editingDocsId: string | null = null;
  // ******* 📌 Admin Contact ********
  contactForms: any[] = [];
  collaboratorForms: any[] = [];
  // ******* 📌 Admin Formularios ********
  consultas: Formulario[] = []; // Solo formularios de tipo 'consulta'
  colaboradores: Formulario[] = []; // Solo formularios de tipo 'colaborador'

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
    private carruselService: CarruselesService,
    private membersService: MembersService,
    private equipoService: EquipoService,
    private cdr: ChangeDetectorRef,
    private fileService: FilesService,
  ) {

  }

  ngOnInit() {
    // Suscribirse a los logos actuales para actualizar en tiempo real
    this.logoService.currentNavbarLogo.subscribe(url => this.navbarLogo = url);
    this.logoService.currentFooterLogo.subscribe(url => this.footerLogo = url);

    // Cargar todos los logos subidos previamente
    this.logoService.getNavbarLogos().subscribe(logos => this.navbarLogos = logos);
    this.logoService.getFooterLogos().subscribe(logos => this.footerLogos = logos);

    // Cargar slides al iniciar
    this.loadSlides();

    this.equipoService.getEquipoMembers().subscribe(data => {
      this.equipo = data;
      this.cdr.detectChanges();
    });

    this.loadMembers();

    this.fileService.getEcosystemItems().subscribe((items: EcosystemItem[]) => {
      this.ecosystemDocuments = items;
      this.cdr.detectChanges();
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
  selectSection(key: string): void {
    this.selectedKey = key;
  }
  // ******* 📌 Admin Logos ********
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    this.selectedFile = input.files[0];
    const reader = new FileReader();
    reader.onload = () => this.imagePreview = reader.result as string;
    reader.readAsDataURL(this.selectedFile);
  }
  async uploadNavbarLogo() {
    if (!this.selectedFile) return;
    this.uploading = true;
    try {
      const downloadURL = await this.logoService.uploadLogo(this.selectedFile);
      await this.logoService.changeNavbarLogo(downloadURL);
    } finally {
      this.uploading = false;
      this.selectedFile = null;
      this.imagePreview = null;
    }
  }
  async uploadFooterLogo() {
    if (!this.selectedFile) return;
    this.uploading = true;
    try {
      const downloadURL = await this.logoService.uploadLogo(this.selectedFile);
      await this.logoService.changeFooterLogo(downloadURL);
    } finally {
      this.uploading = false;
      this.selectedFile = null;
      this.imagePreview = null;
    }
  }
  setNavbarLogo(url: string) {
    this.logoService.changeNavbarLogo(url);
  }
  setFooterLogo(url: string) {
    this.logoService.changeFooterLogo(url);
  }
  setAsNavbarLogo(logo: Logo) {
    this.logoService.changeNavbarLogo(logo.url).then(() => {
      this.message.success('Logo del Navbar actualizado.');
    }).catch(error => {
      this.message.error('Error al actualizar el logo del Navbar.');
      console.error('Error cambiando el logo del Navbar:', error);
    });
  }
  setAsFooterLogo(logo: Logo) {
    this.logoService.changeFooterLogo(logo.url).then(() => {
      this.message.success('Logo del Footer actualizado.');
    }).catch(error => {
      this.message.error('Error al actualizar el logo del Footer.');
      console.error('Error cambiando el logo del Footer:', error);
    });
  }
  async deleteLogo(logo: Logo, type: 'navbar' | 'footer') {
    if (!confirm(`¿Eliminar el logo "${logo.name}"?`)) return;

    try {
      if (type === 'navbar') {
        await this.logoService.deleteNavbarLogo(logo.id!, logo.url);
      } else {
        await this.logoService.deleteFooterLogo(logo.id!, logo.url);
      }
      this.message.success('Logo eliminado correctamente.');
    } catch (error) {
      this.message.error('Error al eliminar el logo.');
      console.error('Error eliminando el logo:', error);
    }
  }
  // ******* 📌 Admin Slides ********
  // Cambiar colección
  changeSlideCollection(collection: string): void {
    this.currentCollectionSlidesP = collection;
    this.loadSlides();
    this.resetSlideForm();
  }

  loadSlides(): void {
    this.isLoading = true;
    this.slideService.getSlides(this.currentCollectionSlidesP).subscribe({
      next: (slides) => {
        this.slides = slides.sort((a, b) => a.order - b.order);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar slides:', error);
        this.isLoading = false;
        this.message.error('Error al cargar slides');
        this.cdr.detectChanges();
      }
    });
  }

  // Manejar la selección de archivos
  onSlideFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedSlideFile = event.target.files[0];
      // Vista previa de la imagen
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newSlide.image = e.target.result;
      };
      if (this.selectedSlideFile) {
        reader.readAsDataURL(this.selectedSlideFile);
      }
    }
  }
  async submitSlide(): Promise<void> {
    if (!this.validateSlideForm()) return;

    this.isSubmitting = true;

    try {
      const imageUrl = await this.processSlideImage();
      const slideData = this.createSlideData(imageUrl);

      if (this.editingSlideId) {
        await this.updateExistingSlide(slideData);
      } else {
        await this.createNewSlide(slideData);
      }

      this.resetSlideForm();
      this.loadSlides();
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isSubmitting = false;
    }
  }

  // Métodos auxiliares
  private validateSlideForm(): boolean {
    if (!this.newSlide.text || !this.newSlide.buttonText || !this.newSlide.route) {
      this.message.warning('Por favor, completa todos los campos.');
      return false;
    }
    if (!this.editingSlideId && !this.selectedSlideFile) {
      this.message.warning('Debes seleccionar una imagen.');
      return false;
    }
    return true;
  }

  private async processSlideImage(): Promise<string> {
    if (this.selectedSlideFile) {
      return await this.slideService.uploadImage(
        this.selectedSlideFile, 
        this.currentCollectionSlidesP
      );
    }
    return this.newSlide.image!;
  }

  private createSlideData(imageUrl: string): SlideData {
    return {
      image: imageUrl,
      text: this.newSlide.text!,
      buttonText: this.newSlide.buttonText!,
      route: this.newSlide.route!,
      order: this.newSlide.order || 0
    };
  }

  private async updateExistingSlide(slideData: SlideData): Promise<void> {
    await this.slideService.updateSlide(
      this.editingSlideId!,
      slideData,
      this.currentCollectionSlidesP
    );
    this.message.success('Slide actualizado correctamente.');
  }

  private async createNewSlide(slideData: SlideData): Promise<void> {
    await this.slideService.saveSlide(
      slideData,
      this.currentCollectionSlidesP
    );
    this.message.success('Slide agregado correctamente.');
  }

  private handleError(error: any): void {
    console.error('Error:', error);
    this.message.error(error.message || 'Ocurrió un error');
  }

  startEditSlide(slide: SlideData): void {
    this.editingSlideId = slide.id!;
    this.newSlide = { ...slide };
  }
  cancelEditSlide() {
    this.resetSlideForm();
  }
  async deleteSlide(slideId: string): Promise<void> {
    if (!confirm('¿Estás seguro de eliminar este slide?')) return;

    try {
      await this.slideService.deleteSlide(
        slideId, 
        this.currentCollectionSlidesP
      );
      this.message.success('Slide eliminado correctamente.');
      this.loadSlides();
    } catch (error) {
      console.error('Error al eliminar slide:', error);
      this.message.error('Error al eliminar el slide');
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
  

  // ******* 📌 Admin Ecosystem ********
  // Cambiar colección
  changeEcosystemCollection(collection: string): void {
    this.currentCollectionEcosystem = collection;
    this.getEcosystemData();
    this.resetForm(); // Limpiar formulario al cambiar colección
  }

  // Obtener los elementos del ecosistema
  getEcosystemData(): void {
    this.isLoading = true;
    this.ecosystemService.getEcosystemItems(this.currentCollectionEcosystem).subscribe({
      next: (data) => {
        this.ecosystemItems = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar elementos:', error);
        this.isLoading = false;
        this.message.error('Error al cargar los elementos');
        this.cdr.detectChanges();
      }
    });
  }
  // Manejar la selección de archivos
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedItemFile = event.target.files[0];
      // Mostrar vista previa si es una imagen
      if (this.selectedItemFile && this.selectedItemFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.newItem.image = e.target.result;
        };
        reader.readAsDataURL(this.selectedItemFile);
      }
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

      // Subir nueva imagen si se seleccionó
      if (this.selectedItemFile) {
        imageUrl = await this.ecosystemService.uploadImage(
          this.selectedItemFile, 
          this.currentCollectionEcosystem
        );
      }

      const itemData: EcosystemData = {
        title: this.newItem.title,
        description: this.newItem.description,
        image: imageUrl
      };

      if (this.editingItemId) {
        // Actualizar item existente
        await this.ecosystemService.updateEcosystemItem(
          this.editingItemId,
          itemData,
          this.currentCollectionEcosystem
        );
        this.message.success('Elemento actualizado correctamente.');
      } else {
        // Crear nuevo item
        await this.ecosystemService.saveEcosystemItem(
          itemData,
          this.currentCollectionEcosystem
        );
        this.message.success('Elemento agregado correctamente.');
      }

      this.resetForm();
      this.getEcosystemData(); // Recargar la lista
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
    this.newItem = { ...item };
  }
  // Cancelar la edición y resetear el formulario
  cancelEditItem(): void {
    this.resetForm();
  }
  // Eliminar un item del ecosistema
  async deleteItem(itemId: string): Promise<void> {
    if (confirm('¿Estás seguro de eliminar este elemento del ecosistema?')) {
      try {
        await this.ecosystemService.deleteEcosystemItem(
          itemId,
          this.currentCollectionEcosystem
        );
        this.message.success('Elemento eliminado correctamente.');
        this.getEcosystemData();
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
    // Limpiar input de archivo
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  // ******* 📌 Admin Video ********
  loadVideos() {
    this.videoService.getVideos().subscribe(videos => {
      this.videos = videos.map(video => ({
        id: video.id!,
        url: video.url,
        description: video.description,
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

    if (!this.videoDescription) {
      this.message.warning('Por favor, ingresa una descripción.');
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

      const videoId = await this.videoService.saveVideo(
        this.selectedVideoFile,
        (progress) => {
          this.uploadProgress = progress; // Usa el progreso real si está disponible
        },
        this.videoDescription
      );

      clearInterval(interval); // Detener la simulación cuando termine
      this.uploadProgress = 100; // Completar la barra
      this.message.success('Video subido correctamente.');

      this.selectedVideoFile = null;
      this.videoDescription = '';
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
   // Cambiar colección
   changeTarjetaCollection(collection: string): void {
    this.currentCollectionTarjetas = collection;
    this.getTarjetasData();
    this.resetForm2();
  }

  // Obtener las tarjetas
  getTarjetasData(): void {
    this.isLoading = true;
    this.tarjetaService.getTarjetas(this.currentCollectionTarjetas).subscribe({
      next: (data) => {
        this.tarjetas = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar tarjetas:', error);
        this.isLoading = false;
        this.message.error('Error al cargar las tarjetas');
        this.cdr.detectChanges();
      }
    });
  }
  // Manejar la selección de archivos
  onFileChange2(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedItemFile2 = event.target.files[0];
      // Vista previa de la imagen
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newItem2.imagen = e.target.result;
      };
      if (this.selectedItemFile2) {
        reader.readAsDataURL(this.selectedItemFile2);
      }
    }
  }
  // Crear o editar una tarjeta
  async submitTarjeta(): Promise<void> {
    if (!this.validateTarjetaForm()) return;

    this.isSubmitting = true;

    try {
      const imageUrl = await this.processTarjetaImage();
      const tarjetaData = this.createTarjetaData(imageUrl);

      if (this.editingItemId2) {
        await this.updateExistingTarjeta(tarjetaData);
      } else {
        await this.createNewTarjeta(tarjetaData);
      }

      this.resetForm2();
      this.getTarjetasData();
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isSubmitting = false;
    }
  }

  // Métodos auxiliares
  private validateTarjetaForm(): boolean {
    if (!this.newItem2.titulo || !this.newItem2.ruta) {
      this.message.warning('Por favor, completa todos los campos.');
      return false;
    }
    if (!this.editingItemId2 && !this.selectedItemFile2) {
      this.message.warning('Debes seleccionar una imagen.');
      return false;
    }
    return true;
  }

  private async processTarjetaImage(): Promise<string> {
    if (this.selectedItemFile2) {
      return await this.tarjetaService.uploadImage(
        this.selectedItemFile2, 
        this.currentCollectionTarjetas
      );
    }
    return this.newItem2.imagen!;
  }

  private createTarjetaData(imageUrl: string): TarjetaData {
    return {
      titulo: this.newItem2.titulo!,
      ruta: this.newItem2.ruta!,
      imagen: imageUrl
    };
  }

  private async updateExistingTarjeta(tarjetaData: TarjetaData): Promise<void> {
    await this.tarjetaService.updateTarjeta(
      this.editingItemId2!,
      tarjetaData,
      this.currentCollectionTarjetas
    );
    this.message.success('Tarjeta actualizada correctamente.');
  }

  private async createNewTarjeta(tarjetaData: TarjetaData): Promise<void> {
    await this.tarjetaService.saveTarjeta(
      tarjetaData,
      this.currentCollectionTarjetas
    );
    this.message.success('Tarjeta agregada correctamente.');
  }

  // Iniciar la edición de una tarjeta
  startEditTarjeta(item: TarjetaData): void {
    this.editingItemId2 = item.id!;
    this.newItem2 = { ...item };
  }
  // Cancelar la edición y resetear el formulario
  cancelEditTarjeta(): void {
    this.resetForm2();
  }
  // Eliminar una tarjeta
  async deleteTarjetaItem(itemId: string): Promise<void> {
    if (!confirm('¿Estás seguro de eliminar esta tarjeta?')) return;

    try {
      await this.tarjetaService.deleteTarjeta(
        itemId, 
        this.currentCollectionTarjetas
      );
      this.message.success('Tarjeta eliminada correctamente.');
      this.getTarjetasData();
    } catch (error) {
      console.error('Error al eliminar tarjeta:', error);
      this.message.error('Error al eliminar la tarjeta');
    }
  }
  // Resetear el formulario
  private resetForm2(): void {
    this.newItem2 = { titulo: '', ruta: '', imagen: '' };
    this.editingItemId2 = null;
    this.selectedItemFile2 = null;
    // Limpiar input de archivo
    const fileInput = document.getElementById('tarjetaFileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  // ******* 📌 Admin Laboratorios ********
  // ✅ Manejar la selección de colección de laboratorios
  selectCollectionLab(event: any): void {
    this.selectedCollectionlab = event.target.value;
    this.getLaboratorios();
  }
  // ✅ Obtener los laboratorios según la colección seleccionada
  getLaboratorios(): void {
    if (!this.selectedCollectionlab) {
      this.laboratorios = []; // Si no hay colección seleccionada, vacía la lista
      return;
    }

    this.laboratorioService.getLaboratorios(this.selectedCollectionlab).subscribe(data => {
      this.laboratorios = data;
    });
  }
  // ✅ Manejar la selección de archivos
  onLaboratorioFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedLaboratorioFile = event.target.files[0];
    }
  }
  // ✅ Guardar en ambas colecciones
  async submitLaboratorio(): Promise<void> {
    if (!this.newLaboratorio.titulo || !this.newLaboratorio.descripcion || !this.newLaboratorio.icono) {
      this.message.warning('Por favor, completa todos los campos.');
      return;
    }

    if (!this.editingLaboratorioId && !this.selectedLaboratorioFile) {
      this.message.warning('Debes seleccionar una imagen.');
      return;
    }

    if (!this.selectedCollectionlab) {
      this.message.warning('Por favor, selecciona una colección.');
      return;
    }

    this.isSubmitting = true;

    try {
      let imageUrl: string = this.newLaboratorio.image || '';

      if (this.selectedLaboratorioFile) {
        imageUrl = await this.laboratorioService.uploadImage(this.selectedLaboratorioFile);
        this.selectedLaboratorioFile = null; // Resetear el archivo después de subir
      }

      const laboratorioData = {
        image: imageUrl,
        titulo: this.newLaboratorio.titulo!,
        descripcion: this.newLaboratorio.descripcion!,
        icono: this.newLaboratorio.icono!,
        order: this.newLaboratorio.order!
      };

      if (this.editingLaboratorioId) {
        await this.laboratorioService.updateLaboratorio(this.editingLaboratorioId, laboratorioData, this.selectedCollectionlab);
        this.message.success(`Laboratorio actualizado en la colección ${this.selectedCollectionlab}.`);
      } else {
        await this.laboratorioService.saveLaboratorio(laboratorioData, this.selectedCollectionlab);
        this.message.success(`Laboratorio guardado en la colección ${this.selectedCollectionlab}.`);
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
      image: laboratorio.image,
      order: laboratorio.order
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
    this.newLaboratorio = { titulo: '', descripcion: '', icono: '', image: '', order: 0 };
    this.editingLaboratorioId = null;
    this.selectedLaboratorioFile = null;
  }

  // ******* 📌 Admin Nosotros ********  
  onCollectionChange(collection: string): void {
    this.currentCollection = collection;
    // Recargar los datos de la nueva colección
    this.getNosotros();
  }

  // ✅ Obtener los elementos de "Nosotros" desde Firestore  

  getNosotros(): void {
    this.nosotrosService.getNosotros(this.currentCollection).subscribe(data => {
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
        imageUrl = await this.nosotrosService.uploadImage(
          this.selectedNosotrosFile,
          this.currentCollection // Pasar el nombre de la colección
        );
      }

      const nosotrosData: Nosotros = {
        image: imageUrl!,
        title: this.newNosotros.title!,
        text: this.newNosotros.text!,
        subItems: this.newNosotros.subItems!,
        order: this.newNosotros.order!
      };

      if (this.editingNosotrosId) {
        // Editar elemento existente
        await this.nosotrosService.updateNosotros(
          this.currentCollection, // Nombre de la colección
          this.editingNosotrosId,
          nosotrosData
        );
        this.message.success('Elemento actualizado correctamente.');
      } else {
        // Crear un nuevo elemento
        await this.nosotrosService.saveNosotros(
          nosotrosData,
          this.currentCollection // Nombre de la colección
        );
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
      subItems: nosotros.subItems,
      order: nosotros.order
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
        await this.nosotrosService.deleteNosotros(
          this.currentCollection  , // Nombre de la colección
          nosotrosId
        );
        this.message.success('Elemento eliminado correctamente.');
      } catch (error) {
        console.error('Error al eliminar el elemento:', error);
        this.message.error('Error al eliminar el elemento.');
      }
    }
  }
  // ✅ Resetear el formulario  
  private resetNosotrosForm(): void {
    this.newNosotros = { title: '', text: '', image: '', subItems: '', order: 0 };
    this.editingNosotrosId = null;
    this.selectedNosotrosFile = null;
  }


  // ******* 📌 Admin Timeline ********  
  // ✅ Obtener los eventos de la línea de tiempo
  getTimelineEvents(): void {
    this.isLoading = true;
    this.timelineService.getTimelineEvents(this.currentCollectionTimeline).subscribe({
      next: (data) => {
        this.timelineEvents = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener eventos:', error);
        this.isLoading = false;
        this.message.error('Error al cargar los eventos.');
      }
    });
  }

  // ✅ Cambiar colección
  changeTimelineCollection(collection: string): void {
    this.currentCollectionTimeline = collection;
    this.getTimelineEvents();
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
        await this.timelineService.updateTimelineEvent(
          this.currentCollectionTimeline,
          this.editingEventId,
          this.newEvent
        );
        this.message.success('Evento actualizado correctamente.');
      } else {
        // Crear un nuevo evento
        await this.timelineService.saveTimelineEvent(
          this.newEvent,
          this.currentCollectionTimeline
        );
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
        await this.timelineService.deleteTimelineEvent(
          this.currentCollectionTimeline,
          eventId
        );
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
  // Función para cambiar la colección seleccionada
  selectCollection(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedCollection = target.value;
    this.loadCarruseles(); // Recargar datos de la nueva colección
  }
  // Función para cargar los carruseles de la colección seleccionada
  loadCarruseles() {
    this.carruseles$ = this.carruselService.getSlides(this.selectedCollection);
  }
  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileToUpload = input.files[0];
    }
  }
  // Función para subir una imagen y guardar un carrusel
  async saveCarrusel() {
    if (!this.newCarrusel.text) {
      this.message.warning('Por favor, completa todos los campos.');
      return;
    }

    if (!this.editingCarruselId && !this.fileToUpload) {
      this.message.warning('Debes seleccionar una imagen.');
      return;
    }

    this.isSubmitting = true;

    try {
      let imageUrl = this.newCarrusel.image;

      // Subir nueva imagen si se ha seleccionado
      if (this.fileToUpload) {
        imageUrl = await this.carruselService.uploadImage(this.fileToUpload);
      }

      if (this.editingCarruselId) {
        // Actualizar carrusel existente
        await this.carruselService.updateSlide(
          this.editingCarruselId,
          {
            image: imageUrl!,
            text: this.newCarrusel.text!,
            description: this.newCarrusel.description!,
            order: this.newCarrusel.order!
          },
          this.selectedCollection
        );
        this.message.success('Carrusel actualizado correctamente.');
      } else {
        // Guardar nuevo carrusel
        await this.carruselService.saveSlide(
          {
            image: imageUrl!,
            text: this.newCarrusel.text!,
            description: this.newCarrusel.description!,
            order: this.newCarrusel.order!
          },
          this.selectedCollection
        );
        this.message.success('Carrusel agregado correctamente.');
      }
      // Resetear formulario
      this.resetCarruselForm();
      this.loadCarruseles(); // Recargar lista
    } catch (error) {
      console.error('Error al guardar el carrusel:', error);
      this.message.error('Error al guardar el carrusel.');
    } finally {
      this.isSubmitting = false;
    }
  }
  // 🟢 Iniciar edición de un carrusel
  startEditCarrusel(carrusel: CarruselData) {
    this.editingCarruselId = carrusel.id!;
    this.newCarrusel = {
      image: carrusel.image,
      text: carrusel.text,
      description: carrusel.description,
      order: carrusel.order
    };
  }
  // 🟢 Cancelar edición
  cancelEditCarrusel() {
    this.resetCarruselForm();
  }
  // 🟢 Eliminar carrusel
  async deleteCarrusel(carruselId: string) {
    if (confirm('¿Estás seguro de eliminar este carrusel?')) {
      try {
        await this.carruselService.deleteSlide(carruselId, this.selectedCollection);
        this.message.success('Carrusel eliminado correctamente.');
        this.loadCarruseles(); // Recargar lista
      } catch (error) {
        console.error('Error al eliminar el carrusel:', error);
        this.message.error('Error al eliminar el carrusel.');
      }
    }
  }
  // 🟢 Resetear formulario
  private resetCarruselForm() {
    this.newCarrusel = { image: '', text: '', description: '', order: 0 };
    this.editingCarruselId = null;
    this.fileToUpload = null;
  }
  // 🟢 Función para actualizar solo ciertos datos de un carrusel
  async updateCarrusel(carruselId: string, updatedData: Partial<CarruselData>) {
    try {
      await this.carruselService.updateSlide(carruselId, updatedData, this.selectedCollection);
      this.message.success('Carrusel actualizado correctamente.');
      this.editingCarruselId = null;
      this.loadCarruseles(); // Recargar datos
    } catch (error) {
      console.error('Error al actualizar el carrusel:', error);
      this.message.error('Error al actualizar el carrusel.');
    }
  }

  // ******* 📌 Admin Members ********
  // Cargar miembros desde Firebase
  loadMembers() {
    this.membersService.getMembers(this.currentCollectionMembers).subscribe(members => {
      this.membersLeft = members
        .filter(m => m.group === 'left')
        .sort((a, b) => Number(a.order) - Number(b.order)); // Convertir y ordenar
      this.membersRight = members
        .filter(m => m.group === 'right')
        .sort((a, b) => Number(a.order) - Number(b.order)); // Convertir y ordenar
      this.cdr.detectChanges(); // Detectar cambios en la vista
    });
  }

  // Cambiar colección
onCollectionChangeMembers(collection: string) {
  this.currentCollectionMembers = collection;
  this.loadMembers(); // Recargar miembros de la nueva colección
}

  // Guardar o actualizar miembro
  async saveMember() {
    if (!this.newMember.role || !this.newMember.icon) {
      this.message.warning('Por favor, completa todos los campos.');
      return;
    }
    try {
      if (this.editingMemberId) {
        // Actualizar miembro existente
        await this.membersService.updateMember(
          this.editingMemberId, 
          {
            role: this.newMember.role,
            icon: this.newMember.icon,
            group: this.newMember.group,
            order: this.newMember.order
          },
          this.currentCollectionMembers // Usar la colección actual
        );
        this.message.success('Miembro actualizado correctamente.');
      } else {
        // Guardar nuevo miembro
        await this.membersService.saveMember(
          this.newMember, 
          this.currentCollectionMembers // Usar la colección actual
        );
        this.message.success('Miembro agregado correctamente.');
      }
      this.resetMemberForm();
    } catch (error) {
      console.error('Error al guardar el miembro:', error);
      this.message.error('Error al guardar el miembro.');
    }
  }
  // Iniciar edición de un miembro
  startEditMember(member: MemberData) {
    this.editingMemberId = member.id!;
    this.newMember = { ...member };
  }
  // Cancelar edición
  cancelEditMember() {
    this.resetMemberForm();
  }
  // Eliminar miembro
  async deleteMember(memberId: string) {
    if (confirm('¿Estás seguro de eliminar este miembro?')) {
      try {
        await this.membersService.deleteMember(
          memberId, 
          this.currentCollectionMembers // Usar la colección actual
        );
        this.message.success('Miembro eliminado correctamente.');
        this.loadMembers();
      } catch (error) {
        console.error('Error al eliminar el miembro:', error);
        this.message.error('Error al eliminar el miembro.');
      }
    }
  }
  // Resetear formulario
  private resetMemberForm() {
    this.newMember = { role: '', order: 0, icon: '', group: 'left' };
    this.editingMemberId = null;
  }

  // ******* 📌 Admin Equipo ********

  // Cambiar colección
  cambiarColeccionEquipo(collection: string): void {
    this.currentCollection = collection;
    this.mostrarEquipo();
  }
  // 📌 Obtener los miembros del equipo desde Firebase
  mostrarEquipo(): void {
    this.isLoading = true;
    this.equipoService.getEquipoMembers(this.currentCollectionEquipo).subscribe({
      next: (data) => {
        this.equipo = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar equipo:', error);
        this.isLoading = false;
        this.message.error('Error al cargar el equipo');
        this.cdr.detectChanges();
      }
    });
  }

  // 📌 Manejar la selección de archivos
  // Manejar selección de archivo
  onArchivoSeleccionado(event: any): void {
    if (event.target.files.length > 0) {
      this.archivoSeleccionado = event.target.files[0];
      
      // Mostrar vista previa si es una imagen
      if (this.archivoSeleccionado && this.archivoSeleccionado.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.nuevoMiembro.foto = e.target.result;
        };
        reader.readAsDataURL(this.archivoSeleccionado);
      }
    }
  }
  // 📌 Crear o editar un miembro del equipo
  async enviarMiembro(): Promise<void> {
    if (!this.nuevoMiembro.nombre || !this.nuevoMiembro.cargo) {
      this.message.warning('Por favor, completa todos los campos.');
      return;
    }

    if (!this.editandoMiembroId && !this.archivoSeleccionado) {
      this.message.warning('Debes seleccionar una imagen.');
      return;
    }

    this.isSubmitting = true;

    try {
      let fotoUrl = this.nuevoMiembro.foto;

      // Subir nueva imagen si se seleccionó
      if (this.archivoSeleccionado) {
        fotoUrl = await this.equipoService.uploadImage(this.archivoSeleccionado, this.currentCollectionEquipo);
      }

      const miembroCompleto: EquipoData = {
        nombre: this.nuevoMiembro.nombre!,
        cargo: this.nuevoMiembro.cargo!,
        foto: fotoUrl!
      };

      if (this.editandoMiembroId) {
        // Actualizar miembro existente
        await this.equipoService.updateEquipoMember(
          this.editandoMiembroId, 
          miembroCompleto,
          this.currentCollectionEquipo
        );
        this.message.success('Miembro actualizado correctamente.');
      } else {
        // Crear nuevo miembro
        await this.equipoService.addEquipoMember(
          miembroCompleto,
          this.currentCollectionEquipo
        );
        this.message.success('Miembro agregado correctamente.');
      }

      this.reiniciarFormulario();
      this.mostrarEquipo(); // Recargar la lista
    } catch (error) {
      console.error('Error al guardar el miembro:', error);
      this.message.error('Error al guardar el miembro.');
    } finally {
      this.isSubmitting = false;
    }
  }
  // 📌 Iniciar la edición de un miembro del equipo
  iniciarEdicion(miembro: EquipoData): void {
    this.editandoMiembroId = miembro.id!;
    this.nuevoMiembro = { nombre: miembro.nombre, cargo: miembro.cargo, foto: miembro.foto };
  }
  // 📌 Cancelar la edición y resetear el formulario
  cancelarEdicion(): void {
    this.reiniciarFormulario();
  }
  // 📌 Eliminar un miembro del equipo
  async eliminarMiembro(miembroId: string): Promise<void> {
    if (confirm('¿Estás seguro de eliminar este miembro del equipo?')) {
      try {
        await this.equipoService.deleteEquipoMember(
          miembroId, 
          this.currentCollectionEquipo
        );
        this.message.success('Miembro eliminado correctamente.');
        this.mostrarEquipo();
      } catch (error) {
        console.error('Error al eliminar el miembro:', error);
        this.message.error('Error al eliminar el miembro.');
      }
    }
  }
  // 📌 Resetear el formulario
  private reiniciarFormulario(): void {
    this.nuevoMiembro = { nombre: '', cargo: '', foto: '' };
    this.editandoMiembroId = null;
    this.archivoSeleccionado = null;
    // Limpiar input de archivo
    const fileInput = document.getElementById('fotoInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  // ******* 📌 Admin Files ********

  // 📌 Cargar documentos del ecosistema desde Firestore
  loadEcosystemDocuments(): void {
    this.fileService.getEcosystemItems().subscribe((items: EcosystemItem[]) => {
      this.ecosystemDocuments = items;
      this.cdr.detectChanges();
    });
  }

  // 📌 Manejar selección de imagen
  onImageChange(event: any): void {
    if (event.target.files.length > 0) {
      this.imageDocument = event.target.files[0];
    }
  }

  // 📌 Manejar selección de documento
  onDocumentChange(event: any): void {
    if (event.target.files.length > 0) {
      this.documentFile = event.target.files[0];
    }
  }

  // 📌 Subir un nuevo documento o actualizar
  async submitDocument(): Promise<void> {
    if (!this.imageDocument) {
      alert('Selecciona una imagen.');
      return;
    }

    this.isSubmittingDocs = true;

    try {
      await this.fileService.uploadItem(
        this.newdocument.title,
        this.newdocument.description,
        this.imageDocument ?? undefined,
        this.documentFile ?? undefined
      );
      alert('Documento subido correctamente.');
      this.loadEcosystemDocuments();
    } catch (error) {
      console.error('Error al subir el documento:', error);
    } finally {
      this.isSubmittingDocs = false;
      this.resetDocumentForm();
    }
  }

  // 📌 Iniciar edición de un documento
  startEditDocument(item: EcosystemItem): void {
    this.editingDocsId = item.id || null;
    this.newdocument = { ...item };
  }

  // 📌 Cancelar edición
  cancelEditDocument(): void {
    this.editingDocsId = null;
    this.resetDocumentForm();
  }

  // 📌 Eliminar un documento
  async deleteDocument(id: string): Promise<void> {
    if (confirm('¿Seguro que deseas eliminar este documento?')) {
      await this.fileService.deleteItem(id);
      this.loadEcosystemDocuments();
    }
  }

  // 📌 Restablecer formulario
  resetDocumentForm(): void {
    this.newdocument = { title: '', description: '', imageUrl: '', fileUrl: '' };
    this.imageDocument = null;
    this.documentFile = null;
  }

  // 📌 Descargar archivo
  downloadFile(fileUrl: string): void {
    window.open(fileUrl, '_blank');
  }

}


