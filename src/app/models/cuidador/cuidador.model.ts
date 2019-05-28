import { Paciente } from "../paciente/paciente.model";

export interface Cuidador{
    key?: string;
    nome: string;
    sexo: string;
    dataNascimento: string;
    telefone: string;
    endereco: string;
    tipoCuidador: string;
    parentesco: string;
    paciente: Paciente;
    fag: string; //Frequenta algum grupo
}