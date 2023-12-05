import { ExecutionContext, Injectable, NestInterceptor, CallHandler, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { Contract } from "src/modules/backoffice/contracts/contract";
import { Result } from "src/modules/backoffice/models/result.model";

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {

    constructor(public contract: Contract) {
        
    }

    intercept(context: ExecutionContext, call$: CallHandler): Observable<any> {
        const body = context.switchToHttp().getRequest().body;
        const valid = this.contract.validate(body);

        if(!valid){
            throw new HttpException(
                new Result(
                    'Ops, algo saiu errado',
                    false,
                    null,
                    this.contract.errors),
                    HttpStatus.BAD_REQUEST)
        }

        // Retorno não está igual ao do curso por conta da versão, mesmo assim está interceptando corretamente.
        return call$.handle();
    }
}