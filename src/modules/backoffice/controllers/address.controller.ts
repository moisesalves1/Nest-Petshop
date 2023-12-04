import { Controller, Post, Param, Body, UseInterceptors, HttpException, HttpStatus } from "@nestjs/common";

import { ValidatorInterceptor } from "src/interceptor/validator.interceptor";

import { Address } from "src/modules/backoffice/models/address.model";
import { Result } from "src/modules/backoffice/models/result.model";

import { CreateAddressContract } from "src/modules/backoffice/contracts/customer/create-address.contract";
import { AddressService } from "../services/address.service";
import { AddressType } from "../enums/address-type.enum";

@Controller('v1/addresses')
export class AddressController {

    constructor(private readonly service: AddressService) {

    }

    @Post(':document/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillingAddress(@Param('document') document, @Body() model: Address){
        try {
            await this.service.create(document, model, AddressType.Billing);
            return new Result(null, true, model, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível adicionar seu endereço', false, null, error), HttpStatus.BAD_REQUEST)
        }
    }


    @Post(':document/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddress(@Param('document') document, @Body() model: Address){
        try {
            await this.service.create(document, model, AddressType.Shipping);
            return new Result(null, true, model, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível adicionar seu endereço', false, null, error), HttpStatus.BAD_REQUEST)
        }
    }

}