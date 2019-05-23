import { Paciente } from "../paciente/paciente.model";

export interface Cuidador{
    key?: string;
    nome: string;
    sexo: string;
    dataNascimento: string;
    telefone: string;
    endereco: string;
    paciente: Paciente;
}