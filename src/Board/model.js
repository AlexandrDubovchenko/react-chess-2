import { Cell } from "../Cell/model";
import { Pawn } from "../figures/Pawn";
import { Rook } from "../figures/Rook";
import { Knight } from "../figures/Knight";
import { Bishop } from "../figures/Bishop";
import { Queen } from "../figures/Queen";
import { King } from "../figures/King";

export class Board {
  board = []
  #teams = {
    black: [],
    white: []
  }
  #kingsId = {
  }

  constructor() {
    this.#createBoard()
  }

  #createBoard() {
    for (let i = 0; i < 8; i++) {
      this.board[i] = []
      for (let j = 0; j < 8; j++) {
        const cellColor = (i + j) % 2 === 0 ? 'black' : 'white'
        const figureColor = i < 2 ? 'black' : 'white'
        let figure = null
        const position = { x: j, y: i }
        if (i === 1 || i === 6) {
          figure = new Pawn(`${i}${j}`, figureColor)
        }

        if (i === 0 || i === 7) {
          figure = this.#getInitialFigure(i, j)
        }
        if (figure) {
          this.#teams[figureColor].push(figure)
          figure.position = position
        }
        this.board[i][j] = new Cell(position, cellColor, figure)
      }
    }
    this.#calculateAllPossibleMoves('white')
  }

  #getInitialFigure(i, j) {
    const figureColor = i < 2 ? 'black' : 'white'
    const id = `${i}${j}`
    switch (j) {
      case 0:
      case 7:
        return new Rook(id, figureColor)
      case 1:
      case 6:
        return new Knight(id, figureColor)
      case 2:
      case 5:
        return new Bishop(id, figureColor)
      case 3:
        return new Queen(id, figureColor)
      case 4:
        this.#kingsId[figureColor] = id
        return new King(id, figureColor)
    }
  }

  moveFigure(from, to) {
    if (to.figure) {
      to.figure.position = null
      this.#teams[to.figure.color] = this.#teams[to.figure.color].filter((f) => f.id !== to.figure.id)
    }
    to.figure = from.figure
    from.figure = null
    console.log(to);
    to.figure.position = to.position
    to.figure.isTouched = true
    this.#calculateAllPossibleMoves(to.figure.color)
  }

  #calculateTeamPossibleMoves(team) {
    return this.#teams[team].map((figure) => {
      return figure.calculateAllPossibleMoves(this.board, figure.position)
    }).flat()
  }

  #calculateAllPossibleMoves(attackedTeam) {
    this.board.forEach(row => row.forEach(cell => cell.clearPossibleFiguresMoves()))
    const defenseTeam = attackedTeam === 'white' ? 'black' : 'white'
    let isCheck = false
    const attackedTeamMoves = this.#calculateTeamPossibleMoves(attackedTeam)
    attackedTeamMoves.forEach((move) => {
      if (move.to.figure?.id === this.#kingsId[defenseTeam]) isCheck = true
      move.to.addPossibleFigureMove({ figure: move.from.figure, canAttack: move.canAttack })
    })

    let defenseTeamMoves = this.#calculateTeamPossibleMoves(defenseTeam)

    defenseTeamMoves = defenseTeamMoves.filter(move => {
      if (isCheck && !this.canMoveSave(move)) {
        return false
      } else {
        move.to.addPossibleFigureMove({ figure: move.from.figure, canAttack: move.canAttack })
        return true
      }
    })

    if (!defenseTeamMoves.length) {
      this.isGameOver = true
      this.winner = attackedTeam
    }
  }

  canMoveSave(move) {
    const figure = move.from.figure
    const attackedTeam = figure.color === 'white' ? 'black' : 'white'
    const toFigure = move.to.figure
    move.to.figure = move.figure
    move.from.figure = null

    const moves = this.#calculateTeamPossibleMoves(attackedTeam)
    const isKingAttacked = !!moves.find((m) => {
      return m.to.figure?.id === this.#kingsId[figure.color]
    })
    move.from.figure = figure
    move.to.figure = toFigure
    return !isKingAttacked
  }
}
