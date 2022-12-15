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

  addPossibleFigureMove({ figure, canAttack = true }) {
    this.possibleFiguresMoves[figure.color][figure.id] = canAttack
  }

  clearPossibleFiguresMoves() {
    this.possibleFiguresMoves = {
      white: {},
      black: {}
    }
  }
}
