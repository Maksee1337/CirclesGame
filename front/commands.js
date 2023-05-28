export class CanvasClick {
  constructor({ x, y }) {
    this.type = 'canvasClick';
    this.x = x;
    this.y = y;
    return { type: this.type, data: { x: this.x, y: this.y } };
  }
}

export class NewPlayer {
  constructor({ name }) {
    this.type = 'newPlayer';
    this.name = name;
    return { type: this.type, data: { name: this.name } };
  }
}

export class ChatMessage {
  constructor(text) {
    this.type = 'chatMessage';
    this.text = text;
    return { type: this.type, data: { text: this.text } };
  }
}
