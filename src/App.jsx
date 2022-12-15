import { useState } from 'react';
import './App.css';
import { Board } from './Board/model';
import { Board as BoardView } from './Board/view';
import { GameProvider } from './provider/gameProvider';

const initialBoard = new Board()
function App() {
  const [selectedCell, setSelectedCell] = useState(null)
  const [board, setBoard] = useState(initialBoard)
  const update = () => {
    setBoard(Object.assign(Object.create(Object.getPrototypeOf(board)), board))
  }
  return (
    <GameProvider value={{
      setSelectedCell,
      selectedCell,
      moveFigure: (...args) => {
        board.moveFigure(...args)
        update()
      }
    }}>
      <div className='App'>
        <BoardView board={board.board} />
      </div>
    </GameProvider>
  );
}

export default App;
