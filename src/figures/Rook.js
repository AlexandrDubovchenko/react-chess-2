import { Figure } from "./Figure";

export class Rook extends Figure {
  images = {
    white: '/assets/rook-white.svg',
    black: 'assets/rook-black.svg'
  }
  constructor(...args) {
    super(...args)
    this.image = this.images[this.color]
  }

  calculateAllPossibleMoves() {
    return []
  }
}
