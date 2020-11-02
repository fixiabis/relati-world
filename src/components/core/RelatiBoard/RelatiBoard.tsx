import React, { useEffect, useRef } from 'react';
import { RelatiBoard as RelatiBoardValue } from '../../../libs/RelatiGame';
import './index.css';
import RelatiGrid, { RelatiGridProps } from './RelatiGrid';

export interface RelatiBoardProps {
  value: RelatiBoardValue;
  onGridClick?: RelatiGridProps['onClick'];
}

const RelatiBoard: React.FC<RelatiBoardProps> = ({
  value: board,
  onGridClick: emitGridClick,
}) => {
  const boardRef = useRef() as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    if (!boardRef.current?.parentElement) {
      return;
    }

    const boardElement = boardRef.current;

    const resize = () => {
      const {
        offsetWidth,
        offsetHeight,
      } = boardElement.parentElement as HTMLElement;

      const widthRatio = offsetWidth / board.width;
      const heightRatio = offsetHeight / board.height;
      const gridSize = Math.min(widthRatio, heightRatio) * 0.95;

      boardElement.style.gridTemplateColumns = `repeat(${board.width}, ${gridSize}px)`;
      boardElement.style.gridTemplateRows = `repeat(${board.height}, ${gridSize}px)`;
    };

    window.addEventListener('resize', resize);
    window.dispatchEvent(new Event('resize'));

    return () => window.removeEventListener('resize', resize);
  }, [board, boardRef]);

  return (
    <div ref={boardRef} className="relati-board">
      {board.grids.map((grid, i) => (
        <RelatiGrid key={i} value={grid} onClick={emitGridClick} />
      ))}
    </div>
  );
};

export default RelatiBoard;
