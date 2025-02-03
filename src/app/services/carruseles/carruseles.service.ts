import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';

// Interfaz para los datos de los slides
export interface CarruselData {
  id?: string;
  image: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarruselesService {

  constructor(private firestore: Firestore, private storage: Storage) { }

  // Método para subir una imagen a Firebase Storage
  async uploadImage(file: File): Promise<string> {
    const filePath = `slides/${file.name}`;
    const fileRef = ref(this.storage, filePath);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  }

  // Método para obtener la colección correspondiente según la clave
  private getCollectionReference(collectionName: string) {
    return collection(this.firestore, collectionName);
  }

  // Método para guardar un slide en Firestore
  async saveSlide(CarruselData: CarruselData, collectionName: string): Promise<void> {
    const slidesRef = this.getCollectionReference(collectionName);
    try {
      await addDoc(slidesRef, CarruselData);
      console.log(`Slide guardado correctamente en Firestore en la colección: ${collectionName}`);
    } catch (error) {
      console.error('Error al guardar slide en Firestore:', error);
      throw error;
    }
  }

  // Método para obtener todos los slides almacenados en Firestore de la colección correspondiente
  getSlides(collectionName: string): Observable<CarruselData[]> {
    const slidesRef = this.getCollectionReference(collectionName);
    return collectionData(slidesRef, { idField: 'id' }) as Observable<CarruselData[]>;
  }

  // Método para actualizar un slide en Firestore
  async updateSlide(slideId: string, updatedData: Partial<CarruselData>, collectionName: string): Promise<void> {
    const slideDocRef = doc(this.firestore, `${collectionName}/${slideId}`);
    await updateDoc(slideDocRef, updatedData);
  }

  // Método para eliminar un slide de Firestore
  async deleteSlide(slideId: string, collectionName: string): Promise<void> {
    const slideDocRef = doc(this.firestore, `${collectionName}/${slideId}`);
    await deleteDoc(slideDocRef);
  }

}
