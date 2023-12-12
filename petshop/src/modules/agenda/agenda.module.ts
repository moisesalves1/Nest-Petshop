import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AgendaController } from './controllers/agenda.controller';
import { RoomBookService } from './services/room-book.service';
import { RoomRepository } from './repositories/room.repository';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [CqrsModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),],
    controllers: [AgendaController],
    providers: [
        RoomBookService,
        RoomRepository,
        ...CommandHandlers,
        ...EventHandlers
    ]
})
export class AgendaModule {}
