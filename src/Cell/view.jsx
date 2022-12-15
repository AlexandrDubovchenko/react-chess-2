import { useContext } from 'react';
import { Figure } from '../common/Figure';
import { gameContext } from '../provider/gameProvider';


export const Cell = ({ cell }) => {
  const {setSelectedCell, selectedCell, moveFigure} = useContext(gameContext);
  const isSelected = cell.figure && selectedCell?.figure?.id === cell.figure?.id
  const isAvailableToMove = selectedCell?.figure && cell.possibleFiguresMoves[selectedCell.figure.color][selectedCell.figure.id] !== undefined
  const handleCellClick = () => {
    if (selectedCell && (!cell.figure || cell.figure?.color !== selectedCell.figure?.color) && isAvailableToMove) {
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
