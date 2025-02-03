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

  private collectionName = 'ecosystem';

  constructor(private firestore: Firestore, private storage: Storage) { }

  // Método para subir una imagen a Firebase Storage
  async uploadImage(file: File): Promise<string> {
    const filePath = `${this.collectionName}/${file.name}`;
    const fileRef = ref(this.storage, filePath);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  }

  // Método para guardar un nuevo elemento en el ecosistema
  async saveEcosystemItem(itemData: EcosystemData): Promise<void> {
    const ecosystemRef = collection(this.firestore, this.collectionName);
    try {
      await addDoc(ecosystemRef, itemData);
      console.log('Elemento guardado correctamente en Firestore:', itemData);
    } catch (error) {
      console.error('Error al guardar elemento en Firestore:', error);
      throw error;
    }
  }

  // Método para obtener todos los elementos del ecosistema
  getEcosystemItems(): Observable<EcosystemData[]> {
    const ecosystemRef = collection(this.firestore, this.collectionName);
    return collectionData(ecosystemRef, { idField: 'id' }) as Observable<EcosystemData[]>;
  }

  // Método para actualizar un elemento del ecosistema en Firestore
  async updateEcosystemItem(itemId: string, updatedData: Partial<EcosystemData>): Promise<void> {
    const itemDocRef = doc(this.firestore, `${this.collectionName}/${itemId}`);
    await updateDoc(itemDocRef, updatedData);
  }

  // Método para eliminar un elemento del ecosistema en Firestore
  async deleteEcosystemItem(itemId: string): Promise<void> {
    const itemDocRef = doc(this.firestore, `${this.collectionName}/${itemId}`);
    await deleteDoc(itemDocRef);
  }

}
