import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';

// Interfaz para los datos del equipo
export interface EquipoData {
  id?: string;
  nombre: string;
  cargo: string;
  foto: string; // URL de la imagen en Firebase Storage
}

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  private collectionName = 'equipo'; // Nombre de la colección en Firestore

  constructor(private firestore: Firestore, private storage: Storage) { }

  // Método para subir una imagen a Firebase Storage
  async uploadImage(file: File): Promise<string> {
    const filePath = `${this.collectionName}/${file.name}`;
    const fileRef = ref(this.storage, filePath);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  }

  // Método para agregar un nuevo miembro del equipo
  async addEquipoMember(memberData: EquipoData): Promise<void> {
    const equipoRef = collection(this.firestore, this.collectionName);
    try {
      await addDoc(equipoRef, memberData);
      console.log('Miembro agregado correctamente:', memberData);
    } catch (error) {
      console.error('Error al agregar miembro:', error);
      throw error;
    }
  }

  // Método para obtener todos los miembros del equipo
  getEquipoMembers(): Observable<EquipoData[]> {
    const equipoRef = collection(this.firestore, this.collectionName);
    return collectionData(equipoRef, { idField: 'id' }) as Observable<EquipoData[]>;
  }

  // Método para actualizar un miembro del equipo
  async updateEquipoMember(memberId: string, updatedData: Partial<EquipoData>): Promise<void> {
    const memberDocRef = doc(this.firestore, `${this.collectionName}/${memberId}`);
    await updateDoc(memberDocRef, updatedData);
  }

  // Método para eliminar un miembro del equipo
  async deleteEquipoMember(memberId: string): Promise<void> {
    const memberDocRef = doc(this.firestore, `${this.collectionName}/${memberId}`);
    await deleteDoc(memberDocRef);
  }
}
