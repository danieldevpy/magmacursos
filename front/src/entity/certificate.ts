import { Model } from "./model";

export type Certificate = {
    id: number;
    name: string;
    cpf: string;
    date: string;
    model: Model;
}
