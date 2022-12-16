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

  calculateAllPossibleMoves(board) {
    const from = board[this.position.y][this.position.x]
    const moves = []
    const diagonals = {}
    const checkCell = (cell, diagonal) => {
      if (diagonals[diagonal]) return
      if (!cell) return
      if (!cell.figure) {
        moves.push({
          to: cell,
          from
        })
      } else if (cell.figure.color !== this.color) {
        moves.push({
          to: cell,
          from
        })
        diagonals[diagonal] = true
      } else {
        diagonals[diagonal] = true
      }
    }

    for (let i = 1; i < 8; i++) {

      const cells = [
        board[this.position.y - i]?.[this.position.x - i],
        board[this.position.y + i]?.[this.position.x - i],
        board[this.position.y + i]?.[this.position.x + i],
        board[this.position.y - i]?.[this.position.x + i],
      ]

      cells.forEach(checkCell)
    }
    if (this.color === 'white') {
      console.log(moves);
    }
    return moves
  }
}
