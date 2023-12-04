import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "../models/user.model";
import { InjectModel } from "@nestjs/mongoose";
import { Customer } from "../models/customer.model";

@Injectable()
export class CustomerService {
    
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) {
        
    }

    async create(data: Customer): Promise<Customer> {
        const customer = new this.model(data);
        return await customer.save();
    }
}