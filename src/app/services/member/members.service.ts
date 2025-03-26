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
  constructor(private firestore: Firestore) {}

  // Obtener referencia a la colección de Firestore
  private getCollectionReference(collectionName: string = 'members') {
    return collection(this.firestore, collectionName);
  }

  // Obtener todos los miembros de una colección específica
  getMembers(collectionName: string = 'members'): Observable<MemberData[]> {
    return collectionData(this.getCollectionReference(collectionName), { idField: 'id' }) as Observable<MemberData[]>;
  }

  // Guardar un nuevo miembro en una colección específica
  async saveMember(member: MemberData, collectionName: string = 'members'): Promise<void> {
    try {
      const collectionRef = this.getCollectionReference(collectionName);
      await addDoc(collectionRef, member);
      console.log(`Miembro guardado correctamente en la colección ${collectionName}`);
    } catch (error) {
      console.error(`Error al guardar miembro en la colección ${collectionName}:`, error);
      throw error;
    }
  }

  // Actualizar un miembro en una colección específica
  async updateMember(memberId: string, updatedData: Partial<MemberData>, collectionName: string = 'members'): Promise<void> {
    const memberDocRef = doc(this.firestore, `${collectionName}/${memberId}`);
    await updateDoc(memberDocRef, updatedData);
  }

  // Eliminar un miembro de una colección específica
  async deleteMember(memberId: string, collectionName: string = 'members'): Promise<void> {
    const memberDocRef = doc(this.firestore, `${collectionName}/${memberId}`);
    await deleteDoc(memberDocRef);
  }
}