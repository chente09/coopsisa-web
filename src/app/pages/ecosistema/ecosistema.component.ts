import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { EcosystemService, EcosystemData } from '../../services/ecosystem/ecosystem.service';
import { ChangeDetectorRef } from '@angular/core';
import { FilesService, EcosystemItem } from '../../services/files/files.service';
import { NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-ecosistema',
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    RouterModule,
    NzCardModule,
    NzAvatarModule,
    NzGridModule,
    NzModalModule,
    NzUploadModule,
  ],
  templateUrl: './ecosistema.component.html',
  styleUrl: './ecosistema.component.css'
})
export class EcosistemaComponent {
  items: EcosystemData[] = [];
  downloadItems: EcosystemItem[] = [];
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;


  ngOnInit(): void {
    this.ecosystemService.getEcosystemItems().subscribe((itemsData: EcosystemData[]) => {
      {
        this.items = itemsData;
        this.cdr.detectChanges();
      }
    });

    this.fileService.getEcosystemItems().subscribe((items: EcosystemItem[]) => {
      this.downloadItems = items;
      this.cdr.detectChanges();
    });

  }

  constructor(
    private modal: NzModalService,
    private ecosystemService: EcosystemService,
    private cdr: ChangeDetectorRef,
    private fileService: FilesService,
  ) { }
  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }
  openModal(item: { title: string; description: string; }): void {
    this.modal.create({
      nzTitle: item.title,
      nzContent: `
        <div>
          <p>${item.description}</p>
        </div>
      `,
      nzFooter: null,
      nzWidth: 500
    });
  }

  downloadFile(fileUrl: string): void {
    window.open(fileUrl, '_blank');
  }
}
