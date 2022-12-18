import { useEffect, useState } from 'react';
import { Board } from './Board/model';
import { Board as BoardView } from './Board/view';
import { GameProvider } from './provider/gameProvider';
import { Timer } from './Timer/view';

const boardInstance = new Board();
function App() {
  const [selectedCell, setSelectedCell] = useState(null);
  const [activeTeam, setActiveTeam] = useState('white');
  const [board, setBoard] = useState(boardInstance.board);
  const [winner, setWinner] = useState(null);
  const update = () => {
    setBoard([...boardInstance.board]);
  };

  useEffect(() => {
    setActiveTeam((prev) => (prev === 'white' ? 'black' : 'white'));
    setWinner(boardInstance.winner);
  }, [board]);


  return (
    <>
      <GameProvider
        value={{
          setSelectedCell,
          selectedCell,
          moveFigure: (...args) => {
            boardInstance.moveFigure(...args);
            update();
          },
          activeTeam,
          setWinner,
          winner,
        }}
      >
        <div className='app'>
          {winner && <p className='winner_notification'>Winner is: {winner}</p>}
          <div className={(winner && 'app-finished') + ' board_container'}>
            <div>
              <BoardView board={board} />
            </div>
            <div className='timers_container'>
              <Timer team='black' />
              <Timer team='white' />
            </div>
          </div>
        </div>
      </GameProvider>
    </>
  );
}

export default App;
