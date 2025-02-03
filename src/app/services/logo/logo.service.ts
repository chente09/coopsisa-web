import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getDoc, setDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Logo {
  id?: string; // ID opcional para Firestore
  url: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class LogoService {
  private logoSource = new BehaviorSubject<string>('');
  currentLogo = this.logoSource.asObservable();

  constructor(private firestore: Firestore, private storage: Storage) {
    this.loadCurrentLogo();
  }

  /** 📌 Cargar el logo actual desde Firestore */
  async loadCurrentLogo(): Promise<void> {
    try {
      const docRef = doc(this.firestore, 'config/logo');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as Logo;
        if (data.url) {
          this.logoSource.next(data.url);
        }
      }
    } catch (error) {
      console.error('Error cargando el logo:', error);
    }
  }

  /** 📌 Subir un nuevo logo a Firebase Storage y guardarlo en Firestore */
  async uploadLogo(file: File, name: string): Promise<string> {
    try {
      const filePath = `logos/${Date.now()}_${file.name}`;
      const fileRef = ref(this.storage, filePath);
      
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);

      const logoData: Logo = { url: downloadURL, name: name };
      await addDoc(collection(this.firestore, 'logos'), logoData);
      
      return downloadURL;
    } catch (error) {
      console.error('Error subiendo el logo:', error);
      throw error;
    }
  }

  /** 📌 Guardar o actualizar el logo principal en Firestore */
  async changeLogo(logo: Logo): Promise<void> {
    try {
      const logoRef = doc(this.firestore, 'config/logo');
      await setDoc(logoRef, logo);
      this.logoSource.next(logo.url);
    } catch (error) {
      console.error('Error cambiando el logo:', error);
    }
  }

  /** 📌 Obtener todos los logos almacenados */
  getLogos(): Observable<Logo[]> {
    return collectionData(collection(this.firestore, 'logos'), { idField: 'id' }) as Observable<Logo[]>;
  }

  /** 📌 Actualizar el nombre de un logo */
  async updateLogoName(id: string, newName: string): Promise<void> {
    try {
      const docRef = doc(this.firestore, `logos/${id}`);
      await updateDoc(docRef, { name: newName });
    } catch (error) {
      console.error('Error actualizando el nombre del logo:', error);
    }
  }

  /** 📌 Eliminar un logo de Firestore */
  async deleteLogo(id: string): Promise<void> {
    try {
      const docRef = doc(this.firestore, `logos/${id}`);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error eliminando el logo:', error);
    }
  }
}
