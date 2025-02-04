import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';

export interface EcosystemItem {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  fileUrl?: string; // Opcional, solo si hay un archivo PDF o documento
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private collectionName = 'ecosystemItems'; // Nombre de la colección en Firestore

  constructor(private firestore: Firestore, private storage: Storage) {}

  // 📌 Subir imagen y archivo a Firebase Storage y guardar en Firestore
  async uploadItem(title: string, description: string, imageFile: File, documentFile?: File): Promise<void> {
    const imagePath = `images/${imageFile.name}`;
    const imageRef = ref(this.storage, imagePath);

    try {
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      let fileUrl = '';
      if (documentFile) {
        const docPath = `documents/${documentFile.name}`;
        const docRef = ref(this.storage, docPath);
        await uploadBytes(docRef, documentFile);
        fileUrl = await getDownloadURL(docRef);
      }

      // Guardar en Firestore
      const docRef = collection(this.firestore, this.collectionName);
      await addDoc(docRef, { title, description, imageUrl, fileUrl });

      console.log('Elemento subido y guardado en Firestore:', { imageUrl, fileUrl });
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      throw error;
    }
  }

  // 📌 Obtener la lista de elementos del ecosistema
  getEcosystemItems(): Observable<EcosystemItem[]> {
    const itemsRef = collection(this.firestore, this.collectionName);
    return collectionData(itemsRef, { idField: 'id' }) as Observable<EcosystemItem[]>;
  }

  // 📌 Eliminar un elemento del ecosistema
  async deleteItem(docId: string): Promise<void> {
    const docRef = doc(this.firestore, `${this.collectionName}/${docId}`);
    await deleteDoc(docRef);
  }
}
