import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors } from "@nestjs/common";
import { Result } from "../models/result.model";
import { ValidatorInterceptor } from "src/interceptor/validator.interceptor";
import { CreateCustomerContract } from "../contracts/customer.contracts";
import { CreateCustomerDTO } from "../dtos/create-customer.dto";
import { AccountService } from "../services/account.service";
import { User } from "../models/user.model";
import { CustomerService } from "../services/customer.service";
import { Customer } from "../models/customer.model";

@Controller('v1/customers')
export class CustomerController {

    constructor(private readonly accountService: AccountService,
        private readonly customerService: CustomerService) {

    }

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
    async post(@Body() model: CreateCustomerDTO) {
        const user = await this.accountService.create(
            new User(model.document, model.password, true)
        );
        const customer = new Customer(model.name, model.document, model.email, null, null, null, null, user);
        const  res = await this.customerService.create(customer);
        return new Result('Cliente criado com sucesso!', true, res, null);
        // return new Result('Cliente criado com sucesso', true, body, null);
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