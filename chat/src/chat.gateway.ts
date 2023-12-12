import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { connected } from "process";

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()

    handleConnection(client: any) {
        console.log(client.id + ' conectado...');
        client.broadcast.emit('users', {
            user: client.id,
            action: connected
        })
    }

    handleDisconnect(client: any) {
        
    }

    @SubscribeMessage('chat')
    chat(client: any, data: any) {}

    @SubscribeMessage('users')
    users(client: any, data: any) {}
}