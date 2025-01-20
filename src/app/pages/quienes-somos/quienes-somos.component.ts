import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzListModule } from 'ng-zorro-antd/list';

@Component({
  selector: 'app-quienes-somos',
  imports: [
    NzCardModule, 
    NzTimelineModule, 
    CommonModule, 
    FormsModule, 
    NzFlexModule, 
    NzRadioModule,
    NzGridModule,
    NzListModule
  ],
  templateUrl: './quienes-somos.component.html',
  styleUrl: './quienes-somos.component.css'
})
export class QuienesSomosComponent {

  isVertical: boolean = false; // Por defecto, mostrar en horizontal

  timelineEvents = [
    { year: '2018', description: 'Se promueve la idea de una asociación orientada a la capacitación en Economía Social y Solidaria.' },
    { year: '2019', description: 'Se contribuye al cuidado de las personas vinculadas a procesos asociativos durante la pandemia.' },
    { year: '2020', description: 'Se impulsan proyectos de reactivación económica a través de modelos asociativos.' },
    { year: '2021', description: 'Se fortalece capacidades en sostenibilidad para promover la reactivación económica.' },
    { year: '2022', description: 'Se fomenta el modelo asociativo como herramienta para la asistencia humanitaria y la integración de comunidades de acogida.' },
    { year: '2023', description: 'Se conforma la primera cooperativa de servicios de innovación y sostenibilidad: COOPSISA.' },
    { year: '2024', description: 'COOPSISA se consolida como pionera en la implementación de laboratorios de innovación para fortalecer los modelos asociativos de Economía Social y Solidaria.' },

  ];

  equipo = [
    { nombre: 'Juan Pérez', cargo: 'CEO', foto: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' },
    { nombre: 'Ana López', cargo: 'CTO', foto: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' },
    { nombre: 'Carlos Méndez', cargo: 'COO', foto: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' },
    { nombre: 'María García', cargo: 'CFO', foto: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' },
    { nombre: 'Juan Pérez', cargo: 'CEO', foto: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' },
    { nombre: 'Ana López', cargo: 'CTO', foto: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' },
    { nombre: 'Carlos Méndez', cargo: 'COO', foto: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' },
    { nombre: 'María García', cargo: 'CFO', foto: 'https://i.postimg.cc/rFCrGpKR/coopsisa-Logo.png' }
  ];

}
