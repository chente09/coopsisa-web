import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { map, Observable } from 'rxjs';

// Interfaz para la información de "Nosotros"
export interface Nosotros {
  order: any;
  id?: string;
  title: string;
  text: string;
  image: string;
  subItems?: string[] | string;// Lista opcional para elementos adicionales
}

@Injectable({
  providedIn: 'root'
})
export class NosotrosService {
  private collectionName = 'nosotros';

  constructor(private firestore: Firestore, private storage: Storage) { }

  // ✅ Método para subir una imagen a Firebase Storage
  async uploadImage(file: File): Promise<string> {
    const filePath = `${this.collectionName}/${file.name}`;
    const fileRef = ref(this.storage, filePath);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  }

  // ✅ Método para guardar un nuevo elemento en "Nosotros"
  async saveNosotros(nosotros: Nosotros): Promise<void> {
    const nosotrosRef = collection(this.firestore, this.collectionName);
    try {
      await addDoc(nosotrosRef, nosotros);
      console.log('Elemento guardado correctamente:', nosotros);
    } catch (error) {
      console.error('Error al guardar el elemento:', error);
      throw error;
    }
  }

  // ✅ Método para obtener todos los elementos de "Nosotros" desde Firestore
  getNosotros(): Observable<Nosotros[]> {
    const nosotrosRef = collection(this.firestore, this.collectionName);
  
    return collectionData(nosotrosRef, { idField: 'id' }).pipe(
      map((nosotrosList: any[]) =>
        nosotrosList.map(nosotros => ({
          id: nosotros.id,
          order: nosotros.order ?? null, // Maneja valores nulos si es necesario
          title: nosotros.title || '',
          text: nosotros.text || '',
          image: nosotros.image || '',
          subItems: Array.isArray(nosotros.subItems) 
            ? nosotros.subItems 
            : (typeof nosotros.subItems === 'string' ? nosotros.subItems.split(', ') : [])
        }) as Nosotros) // 🔹 Conversión explícita a 'Nosotros'
      )
    );
  }

  // ✅ Método para actualizar un elemento de "Nosotros"
  async updateNosotros(nosotrosId: string, updatedData: Partial<Nosotros>): Promise<void> {
    const nosotrosDocRef = doc(this.firestore, `${this.collectionName}/${nosotrosId}`);
    await updateDoc(nosotrosDocRef, updatedData);
  }

  // ✅ Método para eliminar un elemento de "Nosotros"
  async deleteNosotros(nosotrosId: string): Promise<void> {
    const nosotrosDocRef = doc(this.firestore, `${this.collectionName}/${nosotrosId}`);
    await deleteDoc(nosotrosDocRef);
  }
}
