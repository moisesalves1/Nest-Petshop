import { Flunt } from "src/utils/flunt";
import { Contract } from "../contract";
import { Injectable } from "@nestjs/common";
import { QueryDto } from "src/backoffice/dtos/query.dto";

@Injectable()
export class QueryContract implements Contract {
    errors: any[];
    validate(model: QueryDto): boolean {
        const flunt = new Flunt();

        flunt.isNotGreaterThan(model.take, 1000, 'Take inválido! Valor máximo é igual a 1000')

        this.errors = flunt.errors;
        return flunt.isValid();
    }

}