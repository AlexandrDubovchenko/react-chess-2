export class Cell {
  possibleFiguresMoves = {
    white: {},
    black: {}
  }
  constructor(position, color, figure) {
    this.position = position
    this.color = color
    this.figure = figure
  }

  addPossibleFigureMove({ figure, attackOnly = false, canAttack = true }) {
    this.possibleFiguresMoves[figure.color][figure.id] = { canAttack, attackOnly }
  }

  isAvailableToMove(figure) {
    const possibleMove = this.possibleFiguresMoves[figure.color][figure.id]
    if (!possibleMove) return false
    if (possibleMove.attackOnly) return this.figure && this.figure.color !== figure.color
    if (!possibleMove.canAttack) return !this.figure
    return true
  }

  clearPossibleFiguresMoves() {
    this.possibleFiguresMoves = {
      white: {},
      black: {}
    }
  }
}
