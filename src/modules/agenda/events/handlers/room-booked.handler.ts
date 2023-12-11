import { IEventHandler } from "@nestjs/cqrs";
import { RoomBookedEvent } from "../room-booked.event";


export class RoomBookedHandler implements IEventHandler<RoomBookedEvent> {

    handle(event: RoomBookedEvent) {
        console.log('RoomBokkedEvent:handle - Manipulando o evento Room Booked...');
    }
}