export const directions = {
  Right: 'Right',
  RightForward: 'RightForward',
  Forward: 'Forward',
  Left: 'Left',
  LeftForward: 'LeftForward',
  LeftBack: 'LeftBack',
  Back: 'Back',
  RightBack: 'RightBack'
}

export class StopOnObstructionMovingStrategy {
  static moveUntilObstruction({ board, distance, currentCell, direction }) {
    const moves = [];
    let nextCell = this.getNextCell(currentCell, direction, board)
    while (nextCell && !nextCell.figure && distance > 0) {
      moves.push({
        from: currentCell,
        to: nextCell
      })
      nextCell = this.getNextCell(nextCell, direction, board)
      distance--
    }

    if (nextCell?.figure && nextCell.figure.color !== currentCell.figure.color) {
      moves.push({
        from: currentCell,
        to: nextCell
      })
    }
    return moves
  }

  static getNextCell(currentCell, direction, board) {
    const { x, y } = currentCell.position
    switch (direction) {
      case directions.Right:
        return board[y]?.[x + 1]
      case directions.RightForward:
        return board[y + 1]?.[x + 1]
      case directions.Forward:
        return board[y + 1]?.[x]
      case directions.Left:
        return board[y]?.[x - 1]
      case directions.LeftForward:
        return board[y + 1]?.[x - 1]
      case directions.LeftBack:
        return board[y - 1]?.[x - 1]
      case directions.Back:
        return board[y - 1]?.[x]
      case directions.RightBack:
        return board[y - 1]?.[x + 1]
    }
  }
}
