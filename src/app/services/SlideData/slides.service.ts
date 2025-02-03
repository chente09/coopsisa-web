import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';

// Interfaz para los datos de los slides
export interface SlideData {
  id?: string;
  image: string;
  text: string;
  buttonText: string;
  route: string;
}

@Injectable({
  providedIn: 'root'
})
export class SlidesService {

  private collectionName = 'slides';

  constructor(private firestore: Firestore, private storage: Storage) { }

  // Método para subir una imagen a Firebase Storage
  async uploadImage(file: File): Promise<string> {
    const filePath = `${this.collectionName}/${file.name}`;
    const fileRef = ref(this.storage, filePath);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  }

  // Método para guardar un slide en Firestore
  async saveSlide(slideData: SlideData): Promise<void> {
    const slidesRef = collection(this.firestore, this.collectionName);
    try {
      await addDoc(slidesRef, slideData);
      console.log('Slide guardado correctamente en Firestore:', slideData);
    } catch (error) {
      console.error('Error al guardar slide en Firestore:', error);
      throw error;
    }
  }

  // Método para obtener todos los slides almacenados en Firestore
  getSlides(): Observable<SlideData[]> {
    const slidesRef = collection(this.firestore, this.collectionName);
    return collectionData(slidesRef, { idField: 'id' }) as Observable<SlideData[]>;
  }

  // Método para actualizar un slide en Firestore
  async updateSlide(slideId: string, updatedData: Partial<SlideData>): Promise<void> {
    const slideDocRef = doc(this.firestore, `${this.collectionName}/${slideId}`);
    await updateDoc(slideDocRef, updatedData);
  }

  // Método para eliminar un slide de Firestore
  async deleteSlide(slideId: string): Promise<void> {
    const slideDocRef = doc(this.firestore, `${this.collectionName}/${slideId}`);
    await deleteDoc(slideDocRef);
  }

}
