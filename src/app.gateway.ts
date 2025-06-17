import { OnModuleInit } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // adjust for production
  },
})
@WebSocketGateway({ cors: true })
export class AppGateway implements OnModuleInit {
  onModuleInit() {
    //   throw new Error('Method not implemented.');
    //   this.handleMessage({sender: "2", text: '1'})

    // CONSUME
      this.server.emit('message', {sender: "2", text: '1'}); 
  }
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected');

    // consume quque -> emil -> clear queqe

    // get queue coin warning -> expire in 24 hr

    
    client.emit('message', 'Welcome to the socket server!');
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: { sender: string; text: string }) {
    this.server.emit('message', data); // broadcast to all clients
    // return 'Hello from server';
  }
}
