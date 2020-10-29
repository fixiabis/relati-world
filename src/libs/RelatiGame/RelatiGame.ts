import { placePiece } from './actions';
import { RelatiSymbol } from './definitions/types';
import RelatiBoard from './RelatiBoard';
import { getGameState, getSymbol, reEnablePieces } from './rules';

class RelatiGame {
  public turn: number = 0;
  public board: RelatiBoard;
  public isOver: boolean = false;
  public winner: number = 0;
  public isAllRootPlaced: boolean = false;

  constructor(boardWidth: number, boardHeight: number) {
    this.board = new RelatiBoard(boardWidth, boardHeight);
  }

  public placePiece(x: number, y: number) {
    const grid = this.board.getGridAt(x, y);

    if (grid === null) {
      return;
    }

    const symbol = getSymbol(this.turn) as RelatiSymbol;
    const isSymbolPlaced = placePiece(grid, symbol, this.isAllRootPlaced);

    if (!isSymbolPlaced) {
      return;
    }

    if (this.isAllRootPlaced) {
      reEnablePieces(this.board);
    } else {
      this.isAllRootPlaced = this.turn === 1;
    }

    this.turn++;
    [this.isOver, this.winner] = getGameState(this.board, this.turn);
  }
}

export default RelatiGame;
