import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-c-panel',
  imports: [
    NzLayoutModule,
    NzMenuModule,
    CommonModule,
    NzIconModule,
    NzButtonModule
  ],
  templateUrl: './c-panel.component.html',
  styleUrl: './c-panel.component.css'
})
export class CPanelComponent {
  selectedKey = '1'; // Por defecto, la primera opción

  selectSection(key: string): void {
    this.selectedKey = key;
  }

}
