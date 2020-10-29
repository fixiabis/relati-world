import {
  RelatiSymbol,
  RELATI_DECEASED,
  RELATI_N_SYMBOL,
  RELATI_RECEIVER,
  RELATI_REPEATER,
} from './definitions/types';

import RelatiBoard, { RelatiGrid } from './RelatiBoard';

export const isPlaceable = (grid: RelatiGrid) =>
  grid.symbol === RELATI_N_SYMBOL;

export const isPenetrable = (grid: RelatiGrid) =>
  grid.status === RELATI_DECEASED;

export const isRelatiable = (grid: RelatiGrid, symbol: RelatiSymbol) => {
  for (const [sourceGrid, ...gridsInRoute] of grid.relatiRoutes) {
    const isSourceGridReliable =
      sourceGrid.symbol === symbol && sourceGrid.status <= RELATI_REPEATER;

    if (!isSourceGridReliable) {
      continue;
    }

    const isRouteAvailable = gridsInRoute.every(isPenetrable);

    if (isRouteAvailable) {
      return true;
    }
  }

  return false;
};

export const reEnablePieces = ({ grids }: RelatiBoard) => {
  for (const grid of grids) {
    if (grid.status === RELATI_REPEATER) {
      grid.status = RELATI_RECEIVER;
    }
  }

  let isAllEnabled = false;

  while (!isAllEnabled) {
    isAllEnabled = true;

    for (const grid of grids) {
      if (grid.status !== RELATI_RECEIVER || isPlaceable(grid)) {
        continue;
      }

      if (isRelatiable(grid, grid.symbol)) {
        grid.status = RELATI_REPEATER;
        isAllEnabled = false;
      }
    }
  }
};

export const getSymbol = (turn: number) => ((turn % 2) + 1) as RelatiSymbol;

export const getGameState = (
  { grids }: RelatiBoard,
  turn: number
): [boolean, RelatiSymbol] => {
  if (turn < 2) {
    return [false, RELATI_N_SYMBOL];
  }

  const symbol = getSymbol(turn);
  const placeableGrids = grids.filter(isPlaceable);

  const isSymbolPlaceable = placeableGrids.some((grid) =>
    isRelatiable(grid, symbol)
  );

  if (isSymbolPlaceable) {
    return [false, RELATI_N_SYMBOL];
  }

  const opponentSymbol = getSymbol(turn + 1);

  const isOpponentSymbolPlaceable = placeableGrids.some((grid) =>
    isRelatiable(grid, opponentSymbol)
  );

  if (isOpponentSymbolPlaceable) {
    return [true, opponentSymbol];
  }

  return [true, RELATI_N_SYMBOL];
};
