import React, { useMemo, useState } from 'react';
import { RelatiBoard } from '../components';
import { RelatiGame } from '../libs';
import { RelatiGrid } from '../libs/RelatiGame';

const Play = () => {
  const game = useMemo(() => new RelatiGame(9, 9), []);
  const [, setGameTurn] = useState(0);

  const handleGridClick = ({ x, y }: RelatiGrid) => {
    game.placePiece(x, y);
    setGameTurn(game.turn);
  };

  return (
    <>
      <header></header>
      <main>
        <RelatiBoard
          value={game.board}
          onGridClick={handleGridClick}
          renderGrid={(grid) => (
            <>
              {grid.symbol}, {grid.status}
            </>
          )}
        />
      </main>
      <nav></nav>
    </>
  );
};

export default Play;
