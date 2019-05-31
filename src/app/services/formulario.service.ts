import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';
import { Cuidador } from '../models/cuidador/cuidador.model';

export interface Formulario {
  // I - V >>> RELACIONADO A PERGUNTAS
  // R >>> RELACIONADO A INTERVENÇÃO
  // ION-RADIO >>> Salva como String
  // CHECKBOX >>> Salva como Array
  // INPUT >>> Salva como String
  tipoLigacao: string;
  numeroLigacao: number;
  cuidador: String;
  data: any;
  // Variaveis relacionadas a parte I
  I1: String;
  I2: String;
  I2_1: String[];
  I2_2: String;
  IR1: String[];
  I3: String;
  I4: String;
  I5: String;
  I5_1: String;
  I6: String;
  IR2: String[];
  I7: String;
  IR3: String[];
  
  // Variaveis relacionadas a parte II
  II1: String;
  II2: String;
  II3:String;
  II4: String;
  II5: String;
  II6:String;
  II7: String;
  II8: String;
  IIR1:String[];

  // Variaveis relacionadas a parte III
  III1: String;
  III1_1: String;
  III1_2: String[];
  III2:String;
  III2_1: String;
  IIIR1: String[];
  III3: String;
  III3_1: String[];
  IIIR2: String[];
  III4: String;
  III4_1: String;
  IIIR3: String[];
  III5: String;
  III6: String;
  IIIR4: String[];
  III7: String;
  III7_1: String;
  IIIR5: String[];
  III8:String;
  III9: String[];
  III9_1:String;
  III9_2: String;
  IIIR6: String[];
  III10: String;
  IIIR7: String[];
  III11:String;
  III11_1: String;
  IIIR8:String[];
  III12: String;
  III12_1: String[];
  III12_2: String;
  III13: String;
  IIIR9: String[];
  
  // Variaveis relacionadas a parte IV
  IV1: String;
  IV1_1: String;
  IV2: String;
  IV3: String;
  IV3_1: String;
  IV4: String;
  IV4_1: String;
  IVR1: String[];
  IV5: String;
  IVR2: String[];

  // Variaveis relacionadas a parte V
  V1: String;
  V2: String;
  V2_1: String;
  VR1: String[];

}

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  private formulariosCollection: AngularFirestoreCollection <Formulario>;
  private formularios: Observable<Formulario[]>;

  constructor(db: AngularFirestore) {
    this.formulariosCollection = db.collection<Formulario>('formularios');
    this.formularios = this.formulariosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data };
        });
      })
    );
   }

   
   public async addFormulario(formulario: Formulario){
    const id = await this.formulariosCollection.ref.doc().id;
    formulario['key'] = id;
    return this.formulariosCollection.doc(id).set(formulario);
  }
  
  public getFormularios(){
    return this.formularios;
  }

  public getFormulario(id): Observable<any>{
    return this.formulariosCollection.doc<Formulario>(id).valueChanges();
  }

  updateFormulario(form: Formulario, id: string){
    return this.formulariosCollection.doc(id).update(form);
  }

  public remove(id){
    return this.formulariosCollection.doc(id).delete;
  }

}
