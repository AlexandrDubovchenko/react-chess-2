import { useEffect, useState } from 'react';
import './App.css';
import { Board } from './Board/model';
import { Board as BoardView } from './Board/view';
import { GameProvider } from './provider/gameProvider';

const boardInstance = new Board();
function App() {
  const [selectedCell, setSelectedCell] = useState(null);
  const [attackTeam, setAttackTeam] = useState('white')
  const [board, setBoard] = useState(boardInstance.board);
  const update = () => {
    setBoard([...boardInstance.board]);
  };

  useEffect(() => {
    setAttackTeam(prev => prev === 'white' ? 'black': 'white')
    if (boardInstance.isGameOver) alert('Winner is', boardInstance.winner);
  }, [board]);

  return (
    <GameProvider
      value={{
        setSelectedCell,
        selectedCell,
        moveFigure: (...args) => {
          boardInstance.moveFigure(...args);
          update();
        },
        attackTeam
      }}
    >
      <div className='App'>
        <BoardView board={board} />
      </div>
    </GameProvider>
  );
}

export default App;
