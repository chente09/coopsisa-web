import { Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormularioService, Formulario } from '../../services/formulario/formulario.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzUploadModule,
  ],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  
})
export class ContactoComponent  {
  zoom = 15;
  contactForm: FormGroup;
  collaboratorForm: FormGroup;
  selectedForm: string | null = null;
  selectedPDF: File | null = null;
  pdfFileList: NzUploadFile[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder, 
    private formularioService: FormularioService,
    private message: NzMessageService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.collaboratorForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      skills: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  

  selectForm(type: string): void {
    this.selectedForm = type;
  }
  onSubmit(): void {
    console.log("Enviando consulta..."); // <-- Verificar si se ejecuta
    
    if (this.contactForm.valid) {
      const formulario: Formulario = { 
        ...this.contactForm.value, 
        type: 'consulta' // 🔹 Agregar el tipo de formulario 
      };
  
      console.log("Formulario válido:", formulario); // <-- Verificar datos
      
      this.formularioService
        .saveFormulario(formulario)
        .then(() => {
          this.message.success('¡Tu consulta ha sido enviada!.');
          this.resetForm(this.contactForm);
        })
        .catch((error) => {
          this.message.error('Error al enviar la consulta.');
          console.error('Error al enviar consulta:', error);
        });
    } else {
      this.markAllFieldsAsTouched(this.contactForm);
    }
  }
  
  // Envía el formulario de colaborador
  async onCollaboratorSubmit() {
    if (this.collaboratorForm.valid) {
      const formulario: Formulario = { 
        ...this.collaboratorForm.value, 
        type: 'colaborador' 
      };

      try {
        // Inicia el proceso de envío (deshabilitar el botón)
        this.isSubmitting = true;

        // Pasa el archivo seleccionado (PDF) y guarda la URL en Firestore
        await this.formularioService.saveFormulario(formulario, this.selectedPDF || undefined);
        
        this.message.success('¡Tu mensaje ha sido enviado!');
        
        // Limpia el formulario y el archivo adjunto
        this.resetForm(this.collaboratorForm);
        this.selectedPDF = null;
        this.pdfFileList = []; // Limpia la lista de archivos adjuntos

      } catch (error) {
        this.message.error('Error al enviar los datos.');
        console.error('Error al enviar colaborador:', error);
      } finally {
        // Vuelve a habilitar el botón después de enviar
        this.isSubmitting = false;
      }
    } else {
      this.markAllFieldsAsTouched(this.collaboratorForm);
    }
  }

  private markAllFieldsAsTouched(form: FormGroup): void {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  closeForm(): void {
    this.selectedForm = null;
  }

  private resetForm(form: FormGroup): void {
    form.reset();
    form.markAsUntouched();
    form.markAsPristine();
  }

  onPDFSelected(event: any) {
    const file = event.file?.originFileObj;
    if (file) {
      this.selectedPDF = file;
    }
  }

}
