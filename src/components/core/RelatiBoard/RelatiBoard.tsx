import React from 'react';

import {
  RelatiBoard as RelatiBoardValue,
  RelatiGrid as RelatiGridValue,
} from '../../../libs/RelatiGame';

import './index.css';
import { GridRenderrer, useRefForResize } from './utils';

export interface RelatiBoardProps {
  value: RelatiBoardValue;
  renderGrid: GridRenderrer;
  children?: React.ReactNode;

  onGridClick?: (
    grid: RelatiGridValue,
    event: React.MouseEvent<HTMLDivElement>
  ) => void;
}

const RelatiBoard: React.FC<RelatiBoardProps> = ({
  value: boardValue,
  children,
  renderGrid,
  onGridClick: emitGridClick,
}) => {
  const boardRef = useRefForResize(boardValue);

  const boardLayerStyle = {
    gridArea: `1 / 1 / ${boardValue.width + 1} / ${boardValue.height + 1}`,
  };

  return (
    <div ref={boardRef} className="relati-board">
      {React.Children.map(children, (child, key) => (
        <div
          key={key}
          className="relati-board__layer"
          style={boardLayerStyle}
          children={child}
        />
      ))}

      {boardValue.grids.map((gridValue, key) => (
        <div
          key={key}
          className="relati-board__grid"
          children={renderGrid(gridValue)}
          onClick={
            emitGridClick && ((event) => emitGridClick(gridValue, event))
          }
        />
      ))}
    </div>
  );
};

export default RelatiBoard;
