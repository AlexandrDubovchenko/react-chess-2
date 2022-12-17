import { Figure } from "../common/models/Figure";
import { directions, StopOnObstructionMovingStrategy } from "../common/strategies/StopOnObstructionMovingStrategy";

export class King extends Figure {
  images = {
    white: '/assets/king-white.svg',
    black: 'assets/king-black.svg'
  }
  constructor(...args) {
    super(...args)
    this.image = this.images[this.color]
  }

  calculateAllPossibleMoves(board) {
    if (!this.position) return []
    const enemyColor = this.color === 'white' ? 'black' : 'white'
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
      StopOnObstructionMovingStrategy.moveUntilObstruction({ board, currentCell: board[this.position.y][this.position.x], direction, distance: 1 })
    )).flat().filter(move => {
      return !Object.values(move.to.possibleFiguresMoves[enemyColor]).filter(v => v).length
    })
  }
}
