import { Figure } from "./Figure";

export class King extends Figure {
  images = {
    white: '/assets/king-white.svg',
    black: 'assets/king-black.svg'
  }
  constructor(...args) {
    super(...args)
    this.image = this.images[this.color]
  }

  calculateAttackedCells() {
    
  }
}
