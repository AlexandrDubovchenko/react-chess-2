import { Row } from './components/Row';

export const Board = ({ board }) => {
  return board.map((row, i) => <Row id={i} key={i} row={row} />);
};
