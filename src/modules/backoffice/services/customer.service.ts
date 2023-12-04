import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customer } from "src/modules/backoffice/models/customer.model";
import { Address } from "src/modules/backoffice/models/address.model";
import { Pet } from "src/modules/backoffice/models/pet.model";
import { QueryDto } from "src/modules/backoffice/dtos/query.dto";

@Injectable()
export class CustomerService {
    
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) {
        
    }

    async create(data: Customer): Promise<Customer> {
        const customer = new this.model(data);
        return await customer.save();
    }

    async findAll(): Promise<Customer[]> {
        return await this.model.find({}, 'name email document').sort('name').exec();
    }

    async find(document: string): Promise<Customer> {
        return await this.model.findOne({ document }).populate('user', 'username').exec();
    }

    async query(model: QueryDto): Promise<Customer[]> {
        return await this.model.find(model.query, model.fields, { skip: model.skip, limit: model.take }).exec();
    }
}