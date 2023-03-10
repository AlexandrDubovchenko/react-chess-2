import { useContext } from 'react';
import { Figure } from '../common/views/Figure';
import { gameContext } from '../provider/gameProvider';

export const Cell = ({ cell }) => {
  const { setSelectedCell, selectedCell, moveFigure, activeTeam } = useContext(gameContext);
  const isSelected =
    cell.figure && selectedCell?.figure?.id === cell.figure?.id;

  const isAvailableToMove = selectedCell?.figure && cell.isAvailableToMove(selectedCell?.figure);
  const handleCellClick = () => {
    if (
      selectedCell &&
      (!cell.figure || cell.figure?.color !== selectedCell.figure?.color) &&
      isAvailableToMove
    ) {
      moveFigure(selectedCell, cell);
    } else if(cell.figure?.color === activeTeam){
      setSelectedCell(cell);
    } else {
      setSelectedCell(null)
    }
  };

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
