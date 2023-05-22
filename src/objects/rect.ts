import { Figure } from './figure.js';
import { RectInterface } from '../interfaces/objects/rect.interface.js';

export class Rect extends Figure {
  type = 'rect'
  options: RectInterface;
  amount: number;
  constructor(options: RectInterface) {
    super();
    this.options = options;
    this.amount = options.width * options.height;
    return this;
  }
  get(): RectInterface {
    return this.options;
  }
}
