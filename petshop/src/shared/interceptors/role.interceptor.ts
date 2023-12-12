import { ExecutionContext, Injectable, NestInterceptor, CallHandler, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { Contract } from "src/modules/backoffice/contracts/contract";
import { ResultDto } from "src/modules/backoffice/dtos/result.dto";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class RoleInterceptor implements NestInterceptor {

    constructor(public roles: string[]) {
        
    }

    intercept(context: ExecutionContext, call$: CallHandler): Observable<any> {
        const payload: JwtPayload = context.switchToHttp().getRequest().user;
        console.log(payload)

        let hasRole = false;
        payload.roles.forEach((role) => {
            if (this.roles.includes(role))
                hasRole = true;
        })

        if(!hasRole){
            throw new HttpException(new ResultDto('Acesso não autorizado', false, null, null), HttpStatus.FORBIDDEN)
        }

        // Retorno não está igual ao do curso por conta da versão, mesmo assim está interceptando corretamente.
        return call$.handle();
    }
}