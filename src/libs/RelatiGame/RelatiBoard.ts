import { RelatiRoute, RelatiStatus, RelatiSymbol } from './definitions';

export class RelatiGrid {
  public readonly index: number;
  public readonly nearbyGrids: RelatiGrid[] = [];
  public readonly relatiRoutes: RelatiGrid[][] = [];
  public symbol: RelatiSymbol = RelatiSymbol.None;
  public status: RelatiStatus = RelatiStatus.Deceased;

  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly board: RelatiBoard
  ) {
    this.index = y * board.width + x;
  }

  public getGridTo(dx: number, dy: number) {
    const x = this.x + dx;
    const y = this.y + dy;
    const grid = this.board.getGridAt(x, y);
    return grid;
  }
}

class RelatiBoard {
  public grids: RelatiGrid[] = [];

  constructor(public readonly width: number, public readonly height: number) {
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const grid = new RelatiGrid(x, y, this);
        this.grids[grid.index] = grid;
      }
    }

    for (const grid of this.grids) {
      for (const route of RelatiRoute.All) {
        const gridsOfRoute = route.map(([x, y]) => grid.getGridTo(x, y));

        if (gridsOfRoute[0] !== null) {
          grid.relatiRoutes.push(gridsOfRoute as RelatiGrid[]);
        }
      }

      for (const [[x, y]] of RelatiRoute.Normal) {
        const nearbyGrid = grid.getGridTo(x, y);

        if (nearbyGrid !== null) {
          grid.nearbyGrids.push(nearbyGrid);
        }
      }
    }
  }

  public getGridAt(x: number, y: number) {
    const isOverBoundary =
      x < 0 || x >= this.width || y < 0 || y >= this.height;

    if (isOverBoundary) {
      return null;
    }

    const gridIndex = y * this.width + x;
    const grid = this.grids[gridIndex];
    return grid;
  }
}

export default RelatiBoard;
