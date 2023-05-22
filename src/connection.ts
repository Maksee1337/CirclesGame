import EventEmitter from 'events';
import { WebSocketServer } from 'ws';
import { EventsInterface } from './interfaces/events.interface.js';

export class Connection extends WebSocketServer {
  private connections: any[] = [];
  private onCanvasClickCallback: any;
  private onNewPlayerCallback: any;
  private onDisconnectCallback: any;

  public onCanvasClick = (callback: any) => {
    this.onCanvasClickCallback = callback;
  };

  public onNewPlayer = (callback: any) => {
    this.onNewPlayerCallback = callback;
  };

  public onDisconnect = (callback: any) => {
    this.onDisconnectCallback = callback;
  };

  private handleMessage = (client: any) => {
    return (message: Buffer) => {
      try {
        const event: EventsInterface = JSON.parse(message.toString());
        switch (event.type) {
          case 'canvasClick': {
            this.onCanvasClickCallback(event.data, client);
            break;
          }
          case 'newPlayer': {
            this.onNewPlayerCallback(event.data, client);
            break;
          }
        }
      } catch (e) {
        // console.log('error', e);
      }
    };
  };

  private handleClose = (client: any) => {
    return () => {
      this.onDisconnectCallback(client);
    }
  };
  private handleConnection = (client: any) => {
    this.connections.push(client);
    client.on('message', this.handleMessage(client));
    client.on('close', this.handleClose(client));
  };

  constructor(options: any) {
    super(options);
    this.on('connection', this.handleConnection);
  }
}
