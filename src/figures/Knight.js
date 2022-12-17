import { Figure } from "../common/models/Figure";

export class Knight extends Figure {
  images = {
    white: '/assets/knight-white.svg',
    black: '/assets/knight-black.svg'
  }
  constructor(...args) {
    super(...args)
    this.image = this.images[this.color]
  }

  calculateAllPossibleMoves(board) {
    if (!this.position) return []
    const { x, y } = this.position
    const from = board[y][x]
    const moves = []
    for (let i = -2; i <= 2; i++) {
      if (i === 0) continue
      for (let j = -2; j <= 2; j++) {
        if (j === 0) continue
        let cell = board[y - i]?.[x - j]

        if (Math.abs(Math.abs(i) - Math.abs(j)) === 1 && cell && cell.figure?.color !== this.color) {
          moves.push({
            from,
            to: cell
          })
        }
      }
    }
    return moves
  }
}
