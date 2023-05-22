import { NewPlayer } from './commands.js';
import {Name} from "./name.js";

export class Connection extends WebSocket {
  onRenderCallback = null;
  onUpdateLeaderboardCallback = null;
  handleMessage(message) {

    try {
      console.log('Received message:', message.data);
      const msg = JSON.parse(message.data);
      console.log('Received message:', msg.type)
      switch (msg.type) {
        case 'render':
          this.onRenderCallback(msg.data);
          break;
        case 'leaderboard':
          this.onUpdateLeaderboardCallback(msg.data);
          break;
        default:
          console.log('Unknown message type:', data.type);
      }
    } catch (error) {
      console.error('Error while handling message:', error);
    }
  }

  constructor() {
    super('ws://localhost:12345');
    this.addEventListener('open', () => {
      console.log('Connected to WebSocket server');
      window.name = Name.getRandomName();
      this.send(JSON.stringify(new NewPlayer({ name: window.name })));
    });
    this.addEventListener('close', () => {
      console.log('Disconnected from WebSocket server');
    });
    this.addEventListener('message', this.handleMessage);
  }

  //
  // onMessage(callback) {
  //   this.addEventListener('message', callback);
  // }

  onRender(callback) {
    this.onRenderCallback = callback;
  }

  onUpdateLeaderboard(callback) {
    this.onUpdateLeaderboardCallback = callback;
  }
}
