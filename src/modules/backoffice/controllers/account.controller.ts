import { Controller, Get, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/shared/guards/auth.guard";
import { RoleInterceptor } from "src/shared/interceptors/role.interceptor";
import { AuthService } from "src/shared/services/auth.service";


@Controller('v1/accounts')
export class AccountController {
    constructor(private authService: AuthService) { }

    @Post('')
    async createToken(): Promise<any> {
        return await this.authService.createToken();
    }

    @Get('')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(new RoleInterceptor(['admin']))
    findAll() {
        return [];
    }
    

}