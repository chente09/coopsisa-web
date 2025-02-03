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
  async saveLaboratorio(laboratorio: Laboratorio): Promise<void> {
    const laboratoriosRef = collection(this.firestore, this.collectionName);
    try {
      await addDoc(laboratoriosRef, laboratorio);
      console.log('Laboratorio guardado correctamente:', laboratorio);
    } catch (error) {
      console.error('Error al guardar el laboratorio:', error);
      throw error;
    }
  }

  // ✅ Método para obtener todos los laboratorios desde Firestore
  getLaboratorios(): Observable<Laboratorio[]> {
    const laboratoriosRef = collection(this.firestore, this.collectionName);
    return collectionData(laboratoriosRef, { idField: 'id' }) as Observable<Laboratorio[]>;
  }

  // ✅ Método para actualizar un laboratorio en Firestore
  async updateLaboratorio(laboratorioId: string, updatedData: Partial<Laboratorio>): Promise<void> {
    const laboratorioDocRef = doc(this.firestore, `${this.collectionName}/${laboratorioId}`);
    await updateDoc(laboratorioDocRef, updatedData);
  }

  // ✅ Método para eliminar un laboratorio en Firestore
  async deleteLaboratorio(laboratorioId: string): Promise<void> {
    const laboratorioDocRef = doc(this.firestore, `${this.collectionName}/${laboratorioId}`);
    await deleteDoc(laboratorioDocRef);
  }
}

