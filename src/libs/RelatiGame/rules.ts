import RelatiBoard, { RelatiGrid } from './RelatiBoard';
import { RelatiSymbol, RelatiStatus } from './definitions';

export const isPlaceable = (grid: RelatiGrid) =>
  grid.symbol === RelatiSymbol.None;

export const isPenetrable = (grid: RelatiGrid) =>
  grid.status === RelatiStatus.Deceased;

export const isRelatiable = (grid: RelatiGrid, symbol: RelatiSymbol) => {
  for (const [sourceGrid, ...gridsInRoute] of grid.relatiRoutes) {
    const isSourceGridReliable =
      sourceGrid.symbol === symbol &&
      sourceGrid.status <= RelatiStatus.Repeater;

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

export const reEnablePieces = (
  { grids }: RelatiBoard,
  sourceGrids: RelatiGrid[]
) => {
  for (const grid of grids) {
    if (grid.status === RelatiStatus.Repeater) {
      grid.status = RelatiStatus.Receiver;
    }
  }

  while (sourceGrids.length !== 0) {
    const enabledGrids = [];

    for (const sourceGrid of sourceGrids) {
      for (const [targetGrid, ...gridsInRoute] of sourceGrid.relatiRoutes) {
        const isTargetGridPending =
          targetGrid.symbol === sourceGrid.symbol &&
          targetGrid.status === RelatiStatus.Receiver;

        if (!isTargetGridPending) {
          continue;
        }

        const isRouteAvailable = gridsInRoute.every(isPenetrable);

        if (isRouteAvailable) {
          targetGrid.status = RelatiStatus.Repeater;
          enabledGrids.push(targetGrid);
        }
      }
    }

    sourceGrids = enabledGrids;
  }
};

export const getSymbol = (turn: number, playersCount: number) =>
  ((turn % playersCount) + 1) as RelatiSymbol;

export const getGameState = (
  { grids }: RelatiBoard,
  turn: number,
  playersCount: number
): [boolean, RelatiSymbol, number] => {
  if (turn < playersCount) {
    return [false, RelatiSymbol.None, turn];
  }

  for (
    let turnPassedCount = 0;
    turnPassedCount < playersCount;
    turnPassedCount++
  ) {
    const symbol = getSymbol(turn + turnPassedCount, playersCount);
    const placeableGrids = grids.filter(isPlaceable);

    const isSymbolPlaceable = placeableGrids.some((grid) =>
      isRelatiable(grid, symbol)
    );

    if (isSymbolPlaceable) {
      if (turnPassedCount !== playersCount - 1) {
        return [false, RelatiSymbol.None, turn + turnPassedCount];
      } else {
        return [true, symbol, turn + turnPassedCount];
      }
    }
  }

  return [true, RelatiSymbol.None, turn];
};
