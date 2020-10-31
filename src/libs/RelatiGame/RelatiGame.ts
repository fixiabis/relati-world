import { placePiece } from './actions';
import RelatiBoard, { RelatiGrid } from './RelatiBoard';
import { getGameState, getSymbol, reEnablePieces } from './rules';

class RelatiGame {
  public turn: number = 0;
  public board: RelatiBoard;
  public isOver: boolean = false;
  public winner: number = 0;
  public rootGrids: RelatiGrid[] = [];
  public isAllRootPlaced: boolean = false;

  constructor(
    boardWidth: number,
    boardHeight: number,
    public playersCount: number = 2
  ) {
    this.board = new RelatiBoard(boardWidth, boardHeight);
  }

  public placePiece(x: number, y: number) {
    const grid = this.board.getGridAt(x, y);

    if (grid === null) {
      return;
    }

    const symbol = getSymbol(this.turn, this.playersCount);
    const isSymbolPlaced = placePiece(grid, symbol, this.isAllRootPlaced);

    if (!isSymbolPlaced) {
      return;
    }

    if (this.isAllRootPlaced) {
      reEnablePieces(this.board, this.rootGrids);
    } else {
      this.isAllRootPlaced = this.turn === this.playersCount - 1;
      this.rootGrids.push(grid);
    }

    this.turn++;

    [this.isOver, this.winner, this.turn] = getGameState(
      this.board,
      this.turn,
      this.playersCount
    );
  }

  public getNowSymbol() {
    const symbol = getSymbol(this.turn, this.playersCount);
    return symbol;
  }
}

export default RelatiGame;
