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
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(private firestore: Firestore, private storage: Storage) {}

  // Método para subir un video a Firebase Storage y obtener su URL
  async uploadVideo(file: File, collectionName: string): Promise<string> {
    const filePath = `${collectionName}/${file.name}`;
    const fileRef = ref(this.storage, filePath);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  }

  // Método para guardar una URL de video en Firestore
  async saveVideo(file: File, collectionName: string, p0: (progress: any) => void, description: string): Promise<string> {
    const url = await this.uploadVideo(file, collectionName); // Primero sube el video
    const videoData: VideoData = { url, description }; // Crea el objeto con la URL
    const videosRef = collection(this.firestore, collectionName);
    const docRef = await addDoc(videosRef, videoData); // Guarda en Firestore
    return docRef.id;
  }

  // Método para obtener todas las URLs de videos almacenadas en Firestore
  getVideos(collectionName: string): Observable<VideoData[]> {
    const videosRef = collection(this.firestore, collectionName);
    return collectionData(videosRef, { idField: 'id' }) as Observable<VideoData[]>;
  }

  // Método para obtener un video por su ID
  async getVideoById(videoId: string, collectionName: string): Promise<VideoData | undefined> {
    const videoDocRef = doc(this.firestore, `${collectionName}/${videoId}`);
    const videoSnap = await getDoc(videoDocRef);
    return videoSnap.exists() ? ({ id: videoSnap.id, ...videoSnap.data() } as VideoData) : undefined;
  }

  // Método para actualizar una URL de video en Firestore
  async updateVideo(videoId: string, updatedData: Partial<VideoData>, collectionName: string): Promise<void> {
    const videoDocRef = doc(this.firestore, `${collectionName}/${videoId}`);
    await updateDoc(videoDocRef, updatedData);
  }

  // Método para eliminar una URL de video de Firestore
  async deleteVideo(videoId: string, fileName: string, collectionName: string): Promise<void> {
    const videoDocRef = doc(this.firestore, `${collectionName}/${videoId}`);
  
    // Eliminar de Firestore
    await deleteDoc(videoDocRef);
  
    // Eliminar de Firebase Storage
    const fileRef = ref(this.storage, `${collectionName}/${fileName}`);
    await deleteObject(fileRef).catch(error => {
      console.error('Error al eliminar archivo de Storage:', error);
    });
  }
}