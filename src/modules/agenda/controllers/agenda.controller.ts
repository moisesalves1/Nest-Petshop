import { Body, Controller, Post } from "@nestjs/common";
import { RoomBookService } from "../services/room-book.service";
import { BookRoomDto } from "../dtos/book-room.dto";

@Controller('v1/rooms')
export class AgendaController {
    constructor(private readonly service: RoomBookService) { }

    @Post()
    async Book(@Body() body: BookRoomDto) {
        console.log('AppController:Book - Iniciando a requisição');
        await this.service.Book(body.customer, body.room)
    }
}