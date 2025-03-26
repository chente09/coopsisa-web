import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';

// Interfaz para los datos del ecosistema
export interface EcosystemData {
  id?: string;
  title: string;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class EcosystemService {
  constructor(private firestore: Firestore, private storage: Storage) { }

  // Método para subir una imagen a Firebase Storage
  async uploadImage(file: File, collectionName: string): Promise<string> {
    const filePath = `${collectionName}/${file.name}`;
    const fileRef = ref(this.storage, filePath);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  }

  // Método para guardar un nuevo elemento en el ecosistema
  async saveEcosystemItem(itemData: EcosystemData, collectionName: string): Promise<void> {
    const ecosystemRef = collection(this.firestore, collectionName);
    try {
      await addDoc(ecosystemRef, itemData);
      console.log('Elemento guardado correctamente en Firestore:', itemData);
    } catch (error) {
      console.error('Error al guardar elemento en Firestore:', error);
      throw error;
    }
  }

  // Método para obtener todos los elementos del ecosistema
  getEcosystemItems(collectionName: string): Observable<EcosystemData[]> {
    const ecosystemRef = collection(this.firestore, collectionName);
    return collectionData(ecosystemRef, { idField: 'id' }) as Observable<EcosystemData[]>;
  }

  // Método para actualizar un elemento del ecosistema en Firestore
  async updateEcosystemItem(itemId: string, updatedData: Partial<EcosystemData>, collectionName: string): Promise<void> {
    const itemDocRef = doc(this.firestore, `${collectionName}/${itemId}`);
    await updateDoc(itemDocRef, updatedData);
  }

  // Método para eliminar un elemento del ecosistema en Firestore
  async deleteEcosystemItem(itemId: string, collectionName: string): Promise<void> {
    const itemDocRef = doc(this.firestore, `${collectionName}/${itemId}`);
    await deleteDoc(itemDocRef);
  }
}