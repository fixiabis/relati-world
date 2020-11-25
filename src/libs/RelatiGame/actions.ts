import { RelatiGrid } from './RelatiBoard';
import { RelatiSymbol, RelatiStatus } from './definitions';
import { isPlaceable, isRelatiable } from './rules';

export const placePiece = (
  grid: RelatiGrid,
  symbol: RelatiSymbol,
  isAllRootPlaced: boolean
) => {
  if (!isPlaceable(grid)) {
    return false;
  }

  if (isAllRootPlaced) {
    if (isRelatiable(grid, symbol)) {
      grid.prevStatus = grid.status = RelatiStatus.Repeater;
    } else {
      return false;
    }
  } else {
    grid.prevStatus = grid.status = RelatiStatus.Launcher;
  }

  grid.prevSymbol = grid.symbol;
  grid.symbol = symbol;
  return true;
};
