import {
  RelatiSymbol,
  RELATI_LAUNCHER,
  RELATI_REPEATER,
} from './definitions/types';

import { RelatiGrid } from './RelatiBoard';
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
      grid.status = RELATI_REPEATER;
    } else {
      return false;
    }
  } else {
    grid.status = RELATI_LAUNCHER;
  }

  return true;
};
