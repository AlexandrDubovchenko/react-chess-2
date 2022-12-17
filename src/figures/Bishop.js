import { Figure } from "../common/models/Figure";
import { StopOnObstructionMovingStrategy, directions } from '../common/strategies/StopOnObstructionMovingStrategy'

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
    if (!this.position) return []
    return [directions.LeftBack, directions.LeftForward, directions.RightBack, directions.RightForward].map((direction) => (
      StopOnObstructionMovingStrategy.moveUntilObstruction({ board, currentCell: board[this.position.y][this.position.x], direction, distance: board.length - 1 })
    )).flat()
  }
}
