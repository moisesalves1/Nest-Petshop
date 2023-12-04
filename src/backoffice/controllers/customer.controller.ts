import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors } from "@nestjs/common";
import { Result } from "../models/result.model";
import { ValidatorInterceptor } from "src/interceptor/validator.interceptor";
import { CreateCustomerContract } from "../contracts/customer.contracts";
import { CreateCustomerDTO } from "../dtos/create-customer.dto";

@Controller('v1/customers')
export class CustomerController {
    @Get()
    get() {
        return new Result(null, true, [], null);
    }

    @Get(':document')
    getById(@Param('document') document: string) {
        return new Result(null, true, {}, null);
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    post(@Body() body: CreateCustomerDTO) {
        return new Result('Cliente criado com sucesso', true, body, null);
    }

    @Put(':document')
    put(@Param('document') document, @Body() body) {
        return new Result('Cliente alterado com sucesso', true, body, null);
    }

    @Delete(':document')
    delete(@Param('document') document) {
        return new Result('Cliente removido com sucesso', true, null, null);
    } 
}