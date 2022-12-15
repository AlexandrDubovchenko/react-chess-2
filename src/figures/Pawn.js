import { Figure } from "./Figure";

export class Pawn extends Figure {
  images = {
    white: '/assets/pawn-white.svg',
    black: 'assets/pawn-black.svg'
  }
  isTouched = false
  constructor(...args) {
    super(...args)
    this.image = this.images[this.color]
  }

  calculateAllPossibleMoves(board, { x, y }) {
    const moves = []
    const from = board[y][x]
    const direction = this.color === 'white' ? -1 : 1
    let cell = board[y + direction]?.[x]
    if (!cell?.figure) {
      moves.push({
        canAttack: false,
        to: cell,
        from
      })
    }
    cell = board[y + direction * 2]?.[x]
    if (!this.isTouched && !cell?.figure) {
      moves.push({
        canAttack: false,
        to: cell,
        from
      })
    }
    cell = board[y + direction]?.[x - 1]
    if (cell?.figure) {
      moves.push({
        to: cell,
        from
      })
    }
    cell = board[y + direction]?.[x + 1]
    if (cell?.figure) {
      moves.push({
        to: cell,
        from
      })
    }
    return moves
  }
}
