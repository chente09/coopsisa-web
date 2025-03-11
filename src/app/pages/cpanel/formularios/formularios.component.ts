import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioService, Formulario } from '../../../services/formulario/formulario.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-formularios',
  imports: [CommonModule, NzModalModule],
  templateUrl: './formularios.component.html',
  styleUrl: './formularios.component.css'
})
export class FormulariosComponent implements OnInit {
  consultas$: Observable<Formulario[]> = new Observable();
  colaboradores$: Observable<Formulario[]> = new Observable();  // Colaboradores

  constructor(
    private formularioService: FormularioService,
    private router: Router,
    private modal: NzModalService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    // Obtener formularios y separarlos por tipo
    const formularios$ = this.formularioService.getFormularios();

    this.consultas$ = formularios$.pipe(
      map(forms => forms.filter(form => form.type === 'consulta'))
    );

    this.colaboradores$ = formularios$.pipe(
      map(forms => forms.filter(form => form.type === 'colaborador'))
    );
  }

  // ✅ Confirmación antes de eliminar
  confirmarEliminacion(id: string, filePath?: string): void {
    this.modal.confirm({
      nzTitle: '¿Estás seguro de eliminar este formulario?',
      nzContent: 'Esta acción no se puede deshacer.',
      nzOkText: 'Sí, eliminar',
      nzOnOk: () => this.eliminarFormulario(id, filePath),
      nzCancelText: 'Cancelar',
    });
  }

  // ✅ Eliminar formulario y adjunto si existe
  eliminarFormulario(id: string, filePath?: string): void {
    this.formularioService.deleteFormulario(id, filePath)
      .then(() => this.message.success('Formulario eliminado correctamente.'))
      .catch(error => {
        this.message.error('Error al eliminar el formulario.');
        console.error('Error al eliminar:', error);
      });
  }


  goToCPanel() {
    this.router.navigate(['/cpanel']);
  }

  copiarCorreo(email: string) {
    navigator.clipboard.writeText(email).then(() => {
      alert(`Correo copiado: ${email}`);
    }).catch(err => console.error('Error al copiar:', err));
  }

  copiarTodosCorreos(tipo: 'consulta' | 'colaborador') {
    const observable = tipo === 'consulta' ? this.consultas$ : this.colaboradores$;
    observable.subscribe(forms => {
      const emails = forms.map(form => form.email).join(', ');
      navigator.clipboard.writeText(emails).then(() => {
        alert(`Correos copiados: ${emails}`);
      }).catch(err => console.error('Error al copiar:', err));
    });
  }

}
