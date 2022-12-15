import { useContext } from 'react';
import { Figure } from '../common/Figure';
import { gameContext } from '../provider/gameProvider';

const isAvailableToMove = false;

export const Cell = ({ cell }) => {
  const {setSelectedCell, selectedCell, moveFigure} = useContext(gameContext);
  const isSelected = cell.figure && selectedCell?.figure?.id === cell.figure?.id
  const isAvailableToMove = selectedCell?.figure && cell.attackedBy[selectedCell.figure.color][selectedCell.figure.id]
  const handleCellClick = () => {
    if (selectedCell && !cell.figure) {
      moveFigure(selectedCell, cell)
    } else {
      setSelectedCell(cell)
    }
  }

  return (
    <div
      className={`cell cell-${cell.color} ${isSelected && 'cell-selected'}`}
      onClick={handleCellClick}
    >
      {cell.figure && <Figure figure={cell.figure} />}
      {isAvailableToMove && <div className='availableDot' />}
    </div>
  );
};
