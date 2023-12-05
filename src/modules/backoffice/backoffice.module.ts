import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerController } from 'src/modules/backoffice/controllers/customer.controller';
import { CustomerSchema } from 'src/modules/backoffice/schemas/customer.schema';
import { UserSchema } from 'src/modules/backoffice/schemas/user.schema';
import { AccountService } from 'src/modules/backoffice/services/account.service';
import { CustomerService } from 'src/modules/backoffice/services/customer.service';
import { AddressService } from 'src/modules/backoffice/services/address.service';
import { PetService } from 'src/modules/backoffice/services/pet.service';
import { AuthService } from 'src/shared/services/auth.service';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';
import { AddressController } from 'src/modules/backoffice/controllers/address.controller';
import { PetController } from 'src/modules/backoffice/controllers/pet.controller';
import { AccountController } from './controllers/account.controller';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: '54147f5ce0d2',
            signOptions: {
                expiresIn: 3600
            }
        }),
        MongooseModule.forFeature([
            {
                name: 'Customer',
                schema: CustomerSchema
            },
            {
                name: 'User',
                schema: UserSchema
            }
        ]),
    ],
    controllers: [AccountController, CustomerController, AddressController, PetController],
    providers: [AccountService, AddressService, CustomerService, PetService, AuthService, JwtStrategy],
})
export class BackofficeModule {}
