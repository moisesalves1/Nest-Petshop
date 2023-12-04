import { Controller, Get, Post, Param, Body, UseInterceptors, HttpException, HttpStatus } from "@nestjs/common";

import { ValidatorInterceptor } from "src/interceptor/validator.interceptor";

import { AccountService } from "src/modules/backoffice/services/account.service";
import { CustomerService } from "src/modules/backoffice/services/customer.service";

import { Customer } from "src/modules/backoffice/models/customer.model";
import { User } from "src/modules/backoffice/models/user.model";
import { Result } from "src/modules/backoffice/models/result.model";

import { QueryDto } from "src/modules/backoffice/dtos/query.dto";
import { CreateCustomerDTO } from "src/modules/backoffice/dtos/create-customer.dto";

import { QueryContract } from "src/modules/backoffice/contracts/customer/query.contract";
import { CreateCustomerContract } from "src/modules/backoffice/contracts/customer/create-customer.contract";

@Controller('v1/customers')
export class CustomerController {

    constructor(private readonly accountService: AccountService,
        private readonly customerService: CustomerService) {

    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() model: CreateCustomerDTO) {
        try {
            const user = await this.accountService.create(
                new User(model.document, model.password, true)
            );
            const customer = new Customer(model.name, model.document, model.email, [], null, null, null, user);
            const  res = await this.customerService.create(customer);
            return new Result('Cliente criado com sucesso!', true, res, null);
        } catch (error) {
            //Rolback manual
            throw new HttpException(new Result('Não foi possível realizar seu cadastro', false, null, error), HttpStatus.BAD_REQUEST)
        }
    }

    @Get()
    async getAll() {
        const customers = await this.customerService.findAll();
        return new Result(null, true, customers, null)
    }

    @Get(':document')
    async get(@Param('document') document) {
        const customer = await this.customerService.find(document);
        return new Result(null, true, customer, null)
    }

    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
    async query(@Body() model: QueryDto) {
        const customers = await this.customerService.query(model);
        return new Result(null, true, customers, null);
    }

}