import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [
    CommonModule,
    PdfViewerModule,
    NzModalModule,
    NzButtonModule,
    NzIconModule,
    NzToolTipModule
  ],
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnChanges {
  @Input() isVisible = false;
  @Input() pdfUrl = '';
  @Input() title = '';
  @Input() author = '';
  @Input() institution = '';
  
  @Output() closeViewer = new EventEmitter<void>();

  currentZoom = 1;
  isLoading = true;
  hasError = false;
  errorMessage = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isVisible'] && this.isVisible) {
      this.resetViewer();
    }
  }

  private resetViewer(): void {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';
    this.currentZoom = 1;
  }

  onPdfLoad(): void {
    this.isLoading = false;
    this.hasError = false;
  }

  onPdfError(error: any): void {
    console.error('Error cargando PDF:', error);
    this.isLoading = false;
    this.hasError = true;
    this.errorMessage = 'Error al cargar el documento PDF. Verifique que el archivo existe y es válido.';
  }

  onClose(): void {
    this.closeViewer.emit();
  }

  downloadPdf(): void {
    if (this.pdfUrl) {
      const link = document.createElement('a');
      link.href = this.pdfUrl;
      link.download = `${this.title || 'documento'}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  openInNewTab(): void {
    if (this.pdfUrl) {
      window.open(this.pdfUrl, '_blank');
    }
  }

  zoomIn(): void {
    this.currentZoom = Math.min(this.currentZoom + 0.25, 3);
  }

  zoomOut(): void {
    this.currentZoom = Math.max(this.currentZoom - 0.25, 0.5);
  }

  resetZoom(): void {
    this.currentZoom = 1;
  }
}