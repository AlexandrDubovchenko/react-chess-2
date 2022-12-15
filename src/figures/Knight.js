import { Figure } from "./Figure";

export class Knight extends Figure {
  images = {
    white: '/assets/knight-white.svg',
    black: '/assets/knight-black.svg'
  }
  constructor(...args) {
    super(...args)
    this.image = this.images[this.color]
  }

  calculateAttackedCells(board, { x, y }) {
    for (let i = -2; i <= 2; i++) {
      if (i === 0) continue
      for (let j = -2; j <= 2; j++) {
        if (j === 0) continue
        let cell = board[y - i]?.[x - j]
        if (Math.abs(Math.abs(i) - Math.abs(j)) === 1 && cell && cell.figure?.color !== this.color) {
          cell.addAttack(this)
        }
      }
    }
  }
}
