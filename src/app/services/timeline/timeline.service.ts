import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// ✅ Interfaz para los eventos de la línea de tiempo
export interface TimelineEvent {
  id?: string;
  year: string;
  description: string;
  order?: number; // Añadir orden opcional
}

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  constructor(private firestore: Firestore) {}

  // ✅ Obtener todos los eventos ordenados por año
  getTimelineEvents(collectionName: string = 'timelineEvents'): Observable<TimelineEvent[]> {
    const timelineRef = collection(this.firestore, collectionName);
    return collectionData(timelineRef, { idField: 'id' }).pipe(
      map((events: any[]) =>
        events
          .map(event => ({
            id: event.id,
            year: event.year || '',
            description: event.description || '',
            order: event.order || 0 // Añadir orden
          }) as TimelineEvent)
          .sort((a, b) => {
            // Ordenar primero por año, luego por orden
            const yearComparison = Number(a.year) - Number(b.year);
            return yearComparison !== 0 
              ? yearComparison 
              : (a.order || 0) - (b.order || 0);
          })
      )
    );
  }

  // ✅ Guardar un nuevo evento en la línea de tiempo
  async saveTimelineEvent(event: TimelineEvent, collectionName: string = 'timelineEvents'): Promise<void> {
    const timelineRef = collection(this.firestore, collectionName);
    await addDoc(timelineRef, event);
  }

  // ✅ Actualizar un evento existente
  async updateTimelineEvent(
    collectionName: string, 
    eventId: string, 
    updatedData: Partial<TimelineEvent>
  ): Promise<void> {
    const eventDocRef = doc(this.firestore, `${collectionName}/${eventId}`);
    await updateDoc(eventDocRef, updatedData);
  }

  // ✅ Eliminar un evento
  async deleteTimelineEvent(collectionName: string, eventId: string): Promise<void> {
    const eventDocRef = doc(this.firestore, `${collectionName}/${eventId}`);
    await deleteDoc(eventDocRef);
  }
}