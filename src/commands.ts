import { EventsInterface } from './interfaces/events.interface.js';

export class Commands implements EventsInterface {
  public type: string;
  public data: object;

  constructor(type: string, data: object) {
    this.type = type;
    this.data = data;
  }
}
