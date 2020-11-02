import React, { useMemo, useState } from 'react';
import { RelatiBoard } from '../components';
import { RelatiGame } from '../libs';
import { RelatiGrid } from '../libs/RelatiGame';

const boardContainerStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const Play = () => {
  const game = useMemo(() => new RelatiGame(9, 9), []);
  const [, setGameTurn] = useState(0);

  const handleGridClick = ({ x, y }: RelatiGrid) => {
    game.placePiece(x, y);
    setGameTurn(game.turn);
  };

  return (
    <div style={boardContainerStyle}>
      <RelatiBoard value={game.board} onGridClick={handleGridClick} />
    </div>
  );
};

export default Play;
