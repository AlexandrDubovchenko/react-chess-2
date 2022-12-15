export class Cell {
  attackedBy = {
    white: {},
    black: {}
  }
  constructor(position, color, figure) {
    this.position = position
    this.color = color
    this.figure = figure
  }

  addAttack(figure) {
    this.attackedBy[figure.color][figure.id] = figure
  }

  clearAttacks() {
    this.attackedBy = {
      white: {},
      black: {}
    }
  }
}
