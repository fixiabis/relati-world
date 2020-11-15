import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RelatiBoard, Avatar, Button } from '../components';
import RelatiGame, { RelatiGrid } from '../libs/RelatiGame';

const Play = () => {
  const history = useHistory();
  const game = useMemo(() => new RelatiGame(9, 9), []);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [gameTurn, setGameTurn] = useState(0);

  const handleGridClick = ({ x, y }: RelatiGrid) => {
    game.placePiece(x, y);
    setGameTurn(game.turn);
  };

  return (
    <>
      <header className="flex flex:justify-space-between">
        <Avatar border="crimson" />
        <div>{gameTurn}</div>
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
      {isGamePaused && (
        <div
          className="overlay flex"
          style={{ background: 'rgba(0, 0, 0, 0.3)' }}
        >
          <Button onClick={() => history.push('/')}>離開</Button>
        </div>
      )}
      <Button
        small
        float
        style={{ fontSize: 12 }}
        onClick={() => setIsGamePaused(!isGamePaused)}
      >
        {isGamePaused ? '關閉' : '暫停'}
      </Button>
    </>
  );
};

export default Play;
