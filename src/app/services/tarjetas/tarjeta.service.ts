import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';

// Interfaz para los datos de la tarjeta
export interface TarjetaData {
  id?: string;
  titulo: string;
  imagen: string;
  ruta: string;
}

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private collectionName = 'tarjetas';

  constructor(private firestore: Firestore, private storage: Storage) { }

  // Método para subir una imagen a Firebase Storage
  async uploadImage(file: File): Promise<string> {
    const filePath = `${this.collectionName}/${file.name}`;
    const fileRef = ref(this.storage, filePath);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  }

  // Método para guardar una nueva tarjeta
  async saveTarjeta(itemData: TarjetaData): Promise<void> {
    const tarjetasRef = collection(this.firestore, this.collectionName);
    try {
      await addDoc(tarjetasRef, itemData);
      console.log('Tarjeta guardada correctamente en Firestore:', itemData);
    } catch (error) {
      console.error('Error al guardar la tarjeta en Firestore:', error);
      throw error;
    }
  }

  // Método para obtener todas las tarjetas
  getTarjetas(): Observable<TarjetaData[]> {
    const tarjetasRef = collection(this.firestore, this.collectionName);
    return collectionData(tarjetasRef, { idField: 'id' }) as Observable<TarjetaData[]>;
  }

  // Método para actualizar una tarjeta en Firestore
  async updateTarjeta(itemId: string, updatedData: Partial<TarjetaData>): Promise<void> {
    const itemDocRef = doc(this.firestore, `${this.collectionName}/${itemId}`);
    await updateDoc(itemDocRef, updatedData);
  }

  // Método para eliminar una tarjeta en Firestore
  async deleteTarjeta(itemId: string): Promise<void> {
    const itemDocRef = doc(this.firestore, `${this.collectionName}/${itemId}`);
    await deleteDoc(itemDocRef);
  }
}
