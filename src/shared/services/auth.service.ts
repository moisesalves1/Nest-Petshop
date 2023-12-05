import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccountService } from "src/modules/backoffice/services/account.service";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class AuthService {
    
    constructor(
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService
    ) { }

    async createToken() {
        const user: JwtPayload = { 
            document: '12345678911',
            email: 'moises@teste.com',
            image: 'assets/images/user.png',
            roles: ['admin']
        }
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn: 3600,
            accessToken
        }
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return payload 
        // return await this.accountService.findOneByUsername(payload.document);
    }
}