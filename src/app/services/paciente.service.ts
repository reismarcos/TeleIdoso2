import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Paciente } from '../models/paciente/paciente.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';
import { Cuidador } from '../models/cuidador/cuidador.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  // private pacientesListRef = this.db.list<Paciente>('pacientes')
  private cuidadoresCollection: AngularFirestoreCollection<Cuidador>;
  private cuidadoresList: Observable<Cuidador[]>;

  // constructor(private db: AngularFireDatabase) { }
  constructor(private db: AngularFirestore) { 
    this.cuidadoresCollection = db.collection<Cuidador>('cuidadores');

    this.cuidadoresList = this.cuidadoresCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )

  }

  //private pacientesList: Observable<Paciente[]>;

  public getAll(){
    return this.cuidadoresList;
  }

  public async create(cuidador: Cuidador){
    let id = await this.cuidadoresCollection.ref.doc().id;
    cuidador['key'] = id;
    return this.cuidadoresCollection.doc(id).set(cuidador);
    // return this.pacientesCollection.add(paciente);
  }

  public getPaciente(id): Observable<any>{
    return this.cuidadoresCollection.doc<Cuidador>(id).valueChanges();
  }

  updatePaciente(cuidador: Cuidador, id: string){
    return this.cuidadoresCollection.doc(id).update(cuidador);
  }

  public remove(id){
    return this.cuidadoresCollection.doc(id).delete;
  }

  // public getAll(){
  //   return this.pacientesListRef; 
  // }

  // public create(paciente: Paciente){
  //   return this.pacientesListRef.push(paciente); 
  // }
}
