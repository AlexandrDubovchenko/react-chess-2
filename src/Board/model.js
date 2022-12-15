import { Cell } from "../Cell/model";
import { Pawn } from "../figures/Pawn";
import { Rook } from "../figures/Rook";
import { Knight } from "../figures/Knight";
import { Bishop } from "../figures/Bishop";
import { Queen } from "../figures/Queen";
import { King } from "../figures/King";

export class Board {
  board = []

  constructor() {
    this.#createBoard()
  }

  #createBoard() {
    for (let i = 0; i < 8; i++) {
      this.board[i] = [];
      for (let j = 0; j < 8; j++) {
        const cellColor = (i + j) % 2 === 0 ? 'black' : 'white'
        const figureColor = i < 2 ? 'black' : 'white'
        let figure = null
        if (i === 1 || i === 6) {
          figure = new Pawn(`${i}${j}`, figureColor)
        }

        if (i === 0 || i === 7) {
          figure = this.#getInitialFigure(i, j)
        }

        this.board[i][j] = new Cell({ x: j, y: i }, cellColor, figure)
      }
    }
    this.calculateAttacks()
  }

  #getInitialFigure(i, j) {
    const figureColor = i < 2 ? 'black' : 'white'

    switch (j) {
      case 0:
      case 7:
        return new Rook(`${i}${j}`, figureColor)
      case 1:
      case 6:
        return new Knight(`${i}${j}`, figureColor)
      case 2:
      case 5:
        return new Bishop(`${i}${j}`, figureColor)
      case 3:
        return new Queen(`${i}${j}`, figureColor)
      case 4:
        return new King(`${i}${j}`, figureColor)
    }
  }

  moveFigure(from, to) {
    to.figure = from.figure;
    from.figure = null
    this.calculateAttacks()
  }

  calculateAttacks() {
    this.board.forEach((row) => row.forEach((cell) => {
      cell.clearAttacks()
      if (cell.figure) {
        cell.figure.calculateAttackedCells(this.board, cell.position)
      }
    }))
  }
}
