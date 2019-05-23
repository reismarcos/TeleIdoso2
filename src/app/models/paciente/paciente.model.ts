import { Cuidador } from "../cuidador/cuidador.model";

export interface Paciente{
    key?: string;
    nome: string;
    sexo: string;
    dataNascimento: string;
    telefone: string;
    endereco: string;
    instituicao: string;
}