import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, deleteDoc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { deleteObject } from '@angular/fire/storage';

// Interfaz para representar los datos del video
export interface VideoData {
  id?: string;
  file?: File;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private collectionName = 'videos';

  constructor(private firestore: Firestore, private storage: Storage) {}

  // Método para subir un video a Firebase Storage y obtener su URL
  async uploadVideo(file: File): Promise<string> {
    const filePath = `${this.collectionName}/${file.name}`;
    const fileRef = ref(this.storage, filePath);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  }

  // Método para guardar una URL de video en Firestore
  async saveVideo(file: File, p0: (progress: any) => void): Promise<string> {
    const url = await this.uploadVideo(file); // Primero sube el video
    const videoData: VideoData = { url }; // Crea el objeto con la URL
    const videosRef = collection(this.firestore, this.collectionName);
    const docRef = await addDoc(videosRef, videoData); // Guarda en Firestore
    return docRef.id;
  }

  // Método para obtener todas las URLs de videos almacenadas en Firestore
  getVideos(): Observable<VideoData[]> {
    const videosRef = collection(this.firestore, this.collectionName);
    return collectionData(videosRef, { idField: 'id' }) as Observable<VideoData[]>;
  }

  // Método para obtener un video por su ID
  async getVideoById(videoId: string): Promise<VideoData | undefined> {
    const videoDocRef = doc(this.firestore, `${this.collectionName}/${videoId}`);
    const videoSnap = await getDoc(videoDocRef);
    return videoSnap.exists() ? ({ id: videoSnap.id, ...videoSnap.data() } as VideoData) : undefined;
  }

  // Método para actualizar una URL de video en Firestore
  async updateVideo(videoId: string, updatedData: Partial<VideoData>): Promise<void> {
    const videoDocRef = doc(this.firestore, `${this.collectionName}/${videoId}`);
    await updateDoc(videoDocRef, updatedData);
  }

  // Método para eliminar una URL de video de Firestore
  async deleteVideo(videoId: string, fileName: string): Promise<void> {
    const videoDocRef = doc(this.firestore, `${this.collectionName}/${videoId}`);
  
    // Eliminar de Firestore
    await deleteDoc(videoDocRef);
  
    // Eliminar de Firebase Storage
    const fileRef = ref(this.storage, `${this.collectionName}/${fileName}`);
    await deleteObject(fileRef).catch(error => {
      console.error('Error al eliminar archivo de Storage:', error);
    });
  }
}
