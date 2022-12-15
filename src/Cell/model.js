export class Cell {
  figuresCanMove = {
    white: {},
    black: {}
  }
  constructor(position, color, figure) {
    this.position = position
    this.color = color
    this.figure = figure
  }

  addAttack({ figure, canAttack = true }) {
    this.figuresCanMove[figure.color][figure.id] = canAttack
  }

  clearAttacks() {
    this.figuresCanMove = {
      white: {},
      black: {}
    }
  }
}
