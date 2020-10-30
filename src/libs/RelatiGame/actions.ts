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

  grid.symbol = symbol;

  if (isAllRootPlaced) {
    if (isRelatiable(grid, symbol)) {
      grid.status = RelatiStatus.Repeater;
    } else {
      return false;
    }
  } else {
    grid.status = RelatiStatus.Launcher;
  }

  return true;
};
