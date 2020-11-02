import React from 'react';
import { RelatiGrid as RelatiGridValue } from '../../../libs/RelatiGame';

export interface RelatiGridProps {
  value: RelatiGridValue;

  onClick?: (
    grid: RelatiGridValue,
    event: React.MouseEvent<HTMLDivElement>
  ) => void;
}

const RelatiGrid: React.FC<RelatiGridProps> = ({
  value: grid,
  onClick: emitClick,
}) => {
  return (
    <div
      className="relati-board__grid"
      style={{ gridRowStart: grid.y + 1, gridColumnStart: grid.x + 1 }}
      onClick={emitClick && ((event) => emitClick(grid, event))}
    >
      {grid.symbol}, {grid.status}
    </div>
  );
};

export default RelatiGrid;
