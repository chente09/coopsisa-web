import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Interfaz para la información de los formularios
type FormType = 'consulta' | 'colaborador';

export interface Formulario {
  id?: string;
  type: FormType;
  name: string;
  lastName: string;
  email: string;
  message?: string;
  phone?: string;
  skills?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  private collectionName = 'formularios';

  constructor(private firestore: Firestore) {}

  // ✅ Método para guardar un nuevo formulario
  async saveFormulario(formulario: Formulario): Promise<void> {
    const formRef = collection(this.firestore, this.collectionName);
    try {
      await addDoc(formRef, formulario);
      console.log('Formulario guardado correctamente:', formulario);
    } catch (error) {
      console.error('Error al guardar el formulario:', error);
      throw error;
    }
  }

  // ✅ Método para obtener todos los formularios desde Firestore
  getFormularios(): Observable<Formulario[]> {
    const formularioCollection = collection(this.firestore, this.collectionName);
    return collectionData(formularioCollection, { idField: 'id' }) as Observable<Formulario[]>;
  }

  // ✅ Método para eliminar un formulario
  async deleteFormulario(formularioId: string): Promise<void> {
    const formDocRef = doc(this.firestore, `${this.collectionName}/${formularioId}`);
    try {
      await deleteDoc(formDocRef);
      console.log(`Formulario con ID ${formularioId} eliminado`);
    } catch (error) {
      console.error('Error al eliminar el formulario:', error);
      throw error;
    }
  }
  
}
