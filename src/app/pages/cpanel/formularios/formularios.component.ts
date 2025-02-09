import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioService, Formulario } from '../../../services/formulario/formulario.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formularios',
  imports: [ CommonModule ],
  templateUrl: './formularios.component.html',
  styleUrl: './formularios.component.css'
})
export class FormulariosComponent implements OnInit {
  consultas$: Observable<Formulario[]> = new Observable();
colaboradores$: Observable<Formulario[]> = new Observable();  // Colaboradores

  constructor(private formularioService: FormularioService, private router: Router) {}

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

  async eliminarFormulario(id: string) {
    try {
      await this.formularioService.deleteFormulario(id);
      console.log('Formulario eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el formulario:', error);
    }
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
