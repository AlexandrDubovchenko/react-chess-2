import { Figure } from "./Figure";

export class Bishop extends Figure {
  images = {
    white: '/assets/bishop-white.svg',
    black: '/assets/bishop-black.svg'
  }
  constructor(...args) {
    super(...args)
    this.image = this.images[this.color]
  }

  calculateAllPossibleMoves() {
    return []
  }
}
