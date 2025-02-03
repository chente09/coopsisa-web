import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// ✅ Interfaz para los eventos de la línea de tiempo
export interface TimelineEvent {
  id?: string;
  year: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  private collectionName = 'timelineEvents';

  constructor(private firestore: Firestore) {}

  // ✅ Obtener todos los eventos ordenados por año
  getTimelineEvents(): Observable<TimelineEvent[]> {
    const timelineRef = collection(this.firestore, this.collectionName);
    return collectionData(timelineRef, { idField: 'id' }).pipe(
      map((events: any[]) =>
        events
          .map(event => ({
            id: event.id,
            year: event.year || '',
            description: event.description || '',
          }) as TimelineEvent)
          .sort((a, b) => Number(a.year) - Number(b.year)) // Ordenar por año ascendente
      )
    );
  }

  // ✅ Guardar un nuevo evento en la línea de tiempo
  async saveTimelineEvent(event: TimelineEvent): Promise<void> {
    const timelineRef = collection(this.firestore, this.collectionName);
    await addDoc(timelineRef, event);
  }

  // ✅ Actualizar un evento existente
  async updateTimelineEvent(eventId: string, updatedData: Partial<TimelineEvent>): Promise<void> {
    const eventDocRef = doc(this.firestore, `${this.collectionName}/${eventId}`);
    await updateDoc(eventDocRef, updatedData);
  }

  // ✅ Eliminar un evento
  async deleteTimelineEvent(eventId: string): Promise<void> {
    const eventDocRef = doc(this.firestore, `${this.collectionName}/${eventId}`);
    await deleteDoc(eventDocRef);
  }
}
