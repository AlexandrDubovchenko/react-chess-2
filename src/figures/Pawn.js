import { Figure } from "../common/models/Figure";
import { directions, StopOnObstructionMovingStrategy } from "../common/strategies/StopOnObstructionMovingStrategy";

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

  calculateAllPossibleMoves(board) {
    if (!this.position) return []
    const blackDirections = [directions.LeftForward, directions.RightForward]
    const whiteDirections = [directions.LeftBack, directions.RightBack]
    const diagonallyDirections = this.color === 'white' ? whiteDirections : blackDirections
    return diagonallyDirections.map((direction) => {
      const moves = StopOnObstructionMovingStrategy.moveUntilObstruction({ board, currentCell: board[this.position.y][this.position.x], direction, distance: 1 })
      moves.forEach(m => m.attackOnly = true)
      return moves
    }).flat().concat(
      [(this.color === 'white' ? directions.Back : directions.Forward)].map((direction) => {
        const moves = StopOnObstructionMovingStrategy.moveUntilObstruction({
          board,
          currentCell: board[this.position.y][this.position.x],
          direction,
          distance: this.isTouched ? 1 : 2
        })
        moves.forEach(m => m.canAttack = false)
        return moves
      }).flat()
    )
  }
}
