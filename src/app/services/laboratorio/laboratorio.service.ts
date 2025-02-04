import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';

// Interfaz para los datos de los laboratorios
export interface Laboratorio {
  id?: string;
  titulo: string;
  descripcion: string;
  icono: string;
  image: string;
}

@Injectable({   
  providedIn: 'root'
})
export class LaboratorioService {

  private collectionName = 'laboratorios';

  constructor(private firestore: Firestore, private storage: Storage) { }

  // ✅ Método para subir una imagen a Firebase Storage
  async uploadImage(file: File): Promise<string> {
    const filePath = `${this.collectionName}/${file.name}`;
    const fileRef = ref(this.storage, filePath);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  }

  // ✅ Método para guardar un nuevo laboratorio en Firestore
  async saveLaboratorio(laboratorio: Laboratorio, collectionName: string): Promise<void> {
    const laboratoriosRef = collection(this.firestore, collectionName);
    try {
      await addDoc(laboratoriosRef, laboratorio);
      console.log(`Laboratorio guardado correctamente en ${collectionName}:`, laboratorio);
    } catch (error) {
      console.error(`Error al guardar el laboratorio en ${collectionName}:`, error);
      throw error;
    }
  }

  // ✅ Método para obtener todos los laboratorios desde Firestore
  getLaboratorios(collectionName: string): Observable<any[]> {
    const collectionRef = collection(this.firestore, collectionName);
    return collectionData(collectionRef, { idField: 'id' }) as Observable<any[]>;
  }

  // ✅ Método para actualizar un laboratorio en Firestore
  async updateLaboratorio(laboratorioId: string, laboratorio: Partial<Laboratorio>, collectionName: string): Promise<void> {
    const docRef = doc(this.firestore, collectionName, laboratorioId);
    try {
      await updateDoc(docRef, laboratorio);
      console.log(`Laboratorio actualizado en ${collectionName}:`, laboratorio);
    } catch (error) {
      console.error(`Error al actualizar el laboratorio en ${collectionName}:`, error);
      throw error;
    }
  }

  // ✅ Método para eliminar un laboratorio en Firestore
  async deleteLaboratorio(laboratorioId: string): Promise<void> {
    const laboratorioDocRef = doc(this.firestore, `${this.collectionName}/${laboratorioId}`);
    await deleteDoc(laboratorioDocRef);
  }
}

