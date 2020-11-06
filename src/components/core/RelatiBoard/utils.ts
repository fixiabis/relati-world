import React, { useEffect, useRef } from 'react';
import { RelatiBoard, RelatiGrid } from '../../../libs/RelatiGame';

export type GridRenderrer = (grid: RelatiGrid) => JSX.Element;

export const useRefForResize = (boardValue: RelatiBoard) => {
  const boardRef = useRef() as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    if (!boardRef.current?.parentElement) {
      return;
    }

    const board = boardRef.current;
    const boardContainer = board.parentElement as HTMLElement;

    const resize = () => {
      const { offsetWidth, offsetHeight } = boardContainer;
      const widthRatio = offsetWidth / boardValue.width;
      const heightRatio = offsetHeight / boardValue.height;
      const gridSize = Math.min(widthRatio, heightRatio) * 0.95;

      board.style.gridTemplateColumns = `repeat(${boardValue.width}, ${gridSize}px)`;
      board.style.gridTemplateRows = `repeat(${boardValue.height}, ${gridSize}px)`;
    };

    window.addEventListener('resize', resize);
    window.dispatchEvent(new Event('resize'));

    return () => window.removeEventListener('resize', resize);
  }, [boardRef, boardValue]);

  return boardRef;
};
