import { Figure } from './figure.js';
import { RectInterface } from '../interfaces/objects/rect.interface.js';
import { CircleInterface } from '../interfaces/objects/circle.interface.js';

export class Circle extends Figure {
  type = 'circle'
  options: CircleInterface;
  amount: number;
  constructor(options: CircleInterface) {
    super();
    this.options = options;
    this.amount = options.radius;
    return this;
  }

  get(): CircleInterface {
    return this.options;
  }
}
