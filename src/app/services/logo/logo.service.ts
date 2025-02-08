import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getDoc, setDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';

export interface Logo {
  id?: string;
  url: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class LogoService {
  private navbarLogoSource = new BehaviorSubject<string>('');
  private footerLogoSource = new BehaviorSubject<string>('');

  currentNavbarLogo = this.navbarLogoSource.asObservable();
  currentFooterLogo = this.footerLogoSource.asObservable();

  constructor(private firestore: Firestore, private storage: Storage) {
    this.loadNavbarLogo();
    this.loadFooterLogo();
  }

  async loadNavbarLogo(): Promise<void> {
    await this.loadLogo('navbarLogo', this.navbarLogoSource);
  }

  async loadFooterLogo(): Promise<void> {
    await this.loadLogo('footerLogo', this.footerLogoSource);
  }

  private async loadLogo(path: string, subject: BehaviorSubject<string>): Promise<void> {
    try {
      const docRef = doc(this.firestore, `config/${path}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as Logo;
        subject.next(data.url);
      }
    } catch (error) {
      console.error(`Error cargando el logo de ${path}:`, error);
    }
  }

  public async uploadLogo(file: File): Promise<string> {
    try {
      const filePath = `logos/${Date.now()}_${file.name}`;
      const fileRef = ref(this.storage, filePath);
      await uploadBytes(fileRef, file);
      return await getDownloadURL(fileRef);
    } catch (error) {
      console.error('Error subiendo el logo:', error);
      throw error;
    }
  }

  public async deleteOldLogo(url: string): Promise<void> {
    try {
      if (!url) return;
      const fileRef = ref(this.storage, url);
      await deleteObject(fileRef);
    } catch (error) {
      console.warn('No se pudo eliminar la imagen anterior:', error);
    }
  }

  async changeNavbarLogo(url: string): Promise<void> {
    try {
        const logoRef = doc(this.firestore, 'config/navbarLogo');
        await setDoc(logoRef, { url });

        // Verificar si la URL ya está en la colección antes de agregarla
        const logosCollection = collection(this.firestore, 'navbarLogos');
        const snapshot = await firstValueFrom(collectionData(logosCollection, { idField: 'id' })) as Logo[];

        if (!snapshot.some((logo) => logo.url === url)) {
            await addDoc(logosCollection, { url, name: `Navbar ${Date.now()}` });
        }

        this.navbarLogoSource.next(url);
    } catch (error) {
        console.error('Error cambiando el logo del navbar:', error);
    }
}
  
  async changeFooterLogo(url: string): Promise<void> {
    try {
      const logoRef = doc(this.firestore, 'config/footerLogo');
      await setDoc(logoRef, { url });

      // Verificar si la URL ya está en la colección antes de agregarla
      const logosCollection = collection(this.firestore, 'footerLogos');
      const snapshot = await firstValueFrom(collectionData(logosCollection, { idField: 'id' })) as Logo[];

      if (!snapshot.some((logo) => logo.url === url)) {
        await addDoc(logosCollection, { url, name: `Footer ${Date.now()}` });
      }

      this.footerLogoSource.next(url);
    } catch (error) {
      console.error('Error cambiando el logo del footer:', error);
    }
}

  getNavbarLogos(): Observable<Logo[]> {
    return collectionData(collection(this.firestore, 'navbarLogos'), { idField: 'id' }) as Observable<Logo[]>;
  }

  getFooterLogos(): Observable<Logo[]> {
    return collectionData(collection(this.firestore, 'footerLogos'), { idField: 'id' }) as Observable<Logo[]>;
  }

  async updateLogoName(id: string, newName: string): Promise<void> {
    try {
      const docRef = doc(this.firestore, `logos/${id}`);
      await updateDoc(docRef, { name: newName });
    } catch (error) {
      console.error('Error actualizando el nombre del logo:', error);
    }
  }

  async deleteNavbarLogo(id: string, url: string): Promise<void> {
    try {
        await deleteDoc(doc(this.firestore, `navbarLogos/${id}`));
        await this.deleteOldLogo(url);
    } catch (error) {
        console.error('Error eliminando el logo del navbar:', error);
    }
}

async deleteFooterLogo(id: string, url: string): Promise<void> {
    try {
        await deleteDoc(doc(this.firestore, `footerLogos/${id}`));
        await this.deleteOldLogo(url);
    } catch (error) {
        console.error('Error eliminando el logo del footer:', error);
    }
}
}
