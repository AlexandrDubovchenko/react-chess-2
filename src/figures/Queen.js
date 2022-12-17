import { Figure } from "../common/models/Figure";
import { directions, StopOnObstructionMovingStrategy } from "../common/strategies/StopOnObstructionMovingStrategy";

export class Queen extends Figure {
  images = {
    white: '/assets/queen-white.svg',
    black: 'assets/queen-black.svg'
  }
  constructor(...args) {
    super(...args)
    this.image = this.images[this.color]
  }

  calculateAllPossibleMoves(board) {
    if (!this.position) return []
    return [
      directions.Left,
      directions.Forward,
      directions.Back,
      directions.Right,
      directions.LeftBack,
      directions.LeftForward,
      directions.RightBack,
      directions.RightForward
    ].map((direction) => (
      StopOnObstructionMovingStrategy.moveUntilObstruction({ board, currentCell: board[this.position.y][this.position.x], direction, distance: board.length - 1 })
    )).flat()
  }
}
