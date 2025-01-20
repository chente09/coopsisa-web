import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzGridModule } from 'ng-zorro-antd/grid';


@Component({
  selector: 'app-ecosistema',
  imports: [
    CommonModule,
    RouterModule,
    NzCardModule,
    NzAvatarModule,
    NzGridModule
  ],
  templateUrl: './ecosistema.component.html',
  styleUrl: './ecosistema.component.css'
})
export class EcosistemaComponent {
  items: Array<{ title: string; description: string; image: string }> = [
    {
      title: 'Europe Street beat',
      description: 'www.instagram.com',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
    },
    {
      title: 'Ocean Breeze',
      description: 'www.example.com',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
    },
    {
      title: 'Mountain Trek',
      description: 'www.sample.com',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
    },
    {
      title: 'Europe Street beat',
      description: 'www.instagram.com',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
    },
    {
      title: 'Ocean Breeze',
      description: 'www.example.com',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
    },
    {
      title: 'Mountain Trek',
      description: 'www.sample.com',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
    },
    // Agrega más objetos si es necesario
  ];

  downloadItems = [
    {
      title: 'Documento 1',
      description: 'Descripción breve del documento 1.',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
      file: 'path/to/documento1.pdf'
    },
    {
      title: 'Documento 2',
      description: 'Descripción breve del documento 2.',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
      file: 'path/to/documento2.pdf'
    },
    {
      title: 'Documento 3',
      description: 'Descripción breve del documento 3.',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
      file: 'path/to/documento3.pdf'
    },
    {
      title: 'Documento 1',
      description: 'Descripción breve del documento 1.',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
      file: 'path/to/documento1.pdf'
    },
    {
      title: 'Documento 2',
      description: 'Descripción breve del documento 2.',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
      file: 'path/to/documento2.pdf'
    },
    {
      title: 'Documento 3',
      description: 'Descripción breve del documento 3.',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
      file: 'path/to/documento3.pdf'
    },
    {
      title: 'Documento 1',
      description: 'Descripción breve del documento 1.',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
      file: 'path/to/documento1.pdf'
    },
    {
      title: 'Documento 2',
      description: 'Descripción breve del documento 2.',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
      file: 'path/to/documento2.pdf'
    },
    {
      title: 'Documento 3',
      description: 'Descripción breve del documento 3.',
      image: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png',
      file: 'path/to/documento3.pdf'
    }
  ];

  downloadFile(filePath: string): void {
    window.open(filePath, '_blank');
  }
}
