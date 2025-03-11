import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';
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
  attachment?: string; // 🔹 Guardamos solo la ruta del archivo
}

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  private collectionName = 'formularios';

  constructor(
    private firestore: Firestore,
    private storage: Storage
  ) { }

  // ✅ Método para guardar un nuevo formulario con adjunto
  
  async saveFormulario(formulario: Formulario, file?: File): Promise<void> {
    const formRef = collection(this.firestore, this.collectionName);
  
    try {
      let attachmentUrl: string | null = null;
  
      // 📌 Subir el archivo PDF si existe
      if (file) {
        const filePath = `formularios/${Date.now()}_${file.name}`;
        const storageRef = ref(this.storage, filePath);
        
        // Subir archivo
        await uploadBytes(storageRef, file);
  
        // Obtener URL pública de descarga
        attachmentUrl = await getDownloadURL(storageRef); 
      }
  
      // Agregar la URL pública al formulario y guardarlo en Firestore
      const formularioConAdjunto = { ...formulario, attachment: attachmentUrl };
      await addDoc(formRef, formularioConAdjunto);
      console.log('Formulario guardado correctamente con adjunto:', formularioConAdjunto);
    } catch (error) {
      console.error('Error al guardar el formulario:', error);
      throw error;
    }
  }
  

  // ✅ Método para obtener todos los formularios desde Firestore con URLs de descarga
  getFormularios(): Observable<Formulario[]> {
    const formularioCollection = collection(this.firestore, this.collectionName);
    return collectionData(formularioCollection, { idField: 'id' }) as Observable<Formulario[]>;
  }

  // ✅ Método para obtener la URL de descarga de un archivo
  async getDownloadURL(filePath: string): Promise<string | null> {
    if (!filePath) return null;
    const storageRef = ref(this.storage, filePath);
    return getDownloadURL(storageRef);
  }

  // ✅ Método para eliminar un archivo del Storage
  private async deleteFileFromStorage(filePath: string): Promise<void> {
    if (!filePath) return;
    const fileRef = ref(this.storage, filePath);
    try {
      await deleteObject(fileRef);
      console.log('✅ Archivo eliminado del Storage:', filePath);
    } catch (error) {
      console.error('❌ Error al eliminar el archivo del Storage:', error);
    }
  }

  // ✅ Método para eliminar un formulario y su archivo adjunto (si existe)
  async deleteFormulario(formularioId: string, filePath?: string): Promise<void> {
    const formDocRef = doc(this.firestore, `${this.collectionName}/${formularioId}`);
    try {
      // Eliminar el archivo del Storage si existe
      if (filePath) {
        await this.deleteFileFromStorage(filePath);
      }

      // Eliminar el formulario de Firestore
      await deleteDoc(formDocRef);
      console.log(`✅ Formulario con ID ${formularioId} eliminado`);
    } catch (error) {
      console.error('❌ Error al eliminar el formulario:', error);
      throw error;
    }
  }
}
