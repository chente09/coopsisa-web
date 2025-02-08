import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Interfaz para los datos de los miembros
export interface MemberData {
  id?: string;
  role: string;
  icon: string;
  order: number;
  group: 'left' | 'right'; // Para diferenciar miembros de izquierda y derecha
}

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  
  private collectionName = 'members'; // Nombre de la colección en Firestore

  constructor(private firestore: Firestore) {}

  // Obtener referencia a la colección de Firestore
  private getCollectionReference() {
    return collection(this.firestore, this.collectionName);
  }

  // Obtener todos los miembros almacenados en Firestore
  getMembers(): Observable<MemberData[]> {
    return collectionData(this.getCollectionReference(), { idField: 'id' }) as Observable<MemberData[]>;
  }

  // Guardar un nuevo miembro en Firestore
  async saveMember(member: MemberData): Promise<void> {
    try {
      await addDoc(this.getCollectionReference(), member);
      console.log(`Miembro guardado correctamente en Firestore`);
    } catch (error) {
      console.error('Error al guardar miembro en Firestore:', error);
      throw error;
    }
  }

  // Actualizar un miembro en Firestore
  async updateMember(memberId: string, updatedData: Partial<MemberData>): Promise<void> {
    const memberDocRef = doc(this.firestore, `${this.collectionName}/${memberId}`);
    await updateDoc(memberDocRef, updatedData);
  }

  // Eliminar un miembro de Firestore
  async deleteMember(memberId: string): Promise<void> {
    const memberDocRef = doc(this.firestore, `${this.collectionName}/${memberId}`);
    await deleteDoc(memberDocRef);
  }
}
