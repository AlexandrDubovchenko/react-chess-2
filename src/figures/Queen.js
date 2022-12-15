import { Figure } from "./Figure";

export class Queen extends Figure {
  images = {
    white: '/assets/queen-white.svg',
    black: 'assets/queen-black.svg'
  }
  constructor(...args) {
    super(...args)
    this.image = this.images[this.color]
  }

  calculateAttackedCells() {
    
  }
}
