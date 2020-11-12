import React, { useMemo, useState } from 'react';
import { RelatiBoard, Avatar, Button } from '../components';
import RelatiGame, { RelatiGrid } from '../libs/RelatiGame';

const Play = () => {
  const game = useMemo(() => new RelatiGame(9, 9), []);
  const [, setGameTurn] = useState(0);

  const handleGridClick = ({ x, y }: RelatiGrid) => {
    game.placePiece(x, y);
    setGameTurn(game.turn);
  };

  return (
    <>
      <header className="flex flex:justify-space-between">
        <Avatar border="crimson" />
        <div></div>
        <Avatar border="royalblue" />
      </header>
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
      <Button float />
    </>
  );
};

export default Play;
