import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RelatiBoard, Avatar, Button } from '../components';
import RelatiGame, { RelatiGrid } from '../libs/RelatiGame';
import {LottieView,LottieSkin,chessmanSkin} from '../components/animations'
import { RelatiStatus, RelatiSymbol } from '../libs/RelatiGame/definitions'

const pieces = {
  /** 空 */
  [RelatiSymbol.None + '' + RelatiStatus.Deceased]: <LottieSkin id='0'/>,

  /** 玩家1的起源符號 */
  [RelatiSymbol.Player1 + '' + RelatiStatus.Launcher]: <LottieSkin id='1'/>,

  /** 玩家1的可用符號 */
  [RelatiSymbol.Player1 + '' + RelatiStatus.Repeater]: <LottieSkin id='2'/>,

  /** 玩家1的失效符號 */
  [RelatiSymbol.Player1 + '' + RelatiStatus.Receiver]: <LottieSkin id='3'/>,

  /** 玩家2的起源符號 */
  [RelatiSymbol.Player2 + '' + RelatiStatus.Launcher]: <LottieSkin id='4'/>,

  /** 玩家2的可用符號 */
  [RelatiSymbol.Player2 + '' + RelatiStatus.Repeater]: <LottieSkin id='5'/>,

  /** 玩家2的失效符號 */
  [RelatiSymbol.Player2 + '' + RelatiStatus.Receiver]: <LottieSkin id='6'/>,
};

const Play = () => {
  const history = useHistory();
  const game = useMemo(() => new RelatiGame(9, 9), []);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [gameTurn, setGameTurn] = useState(0);

  const handleGridClick = ({ x, y }: RelatiGrid) => {
    game.placePiece(x, y);
    setGameTurn(game.turn);
  };
console.log('fuck',chessmanSkin.chessmanSkin[0])
  return (
    <>
      <header className="flex flex:justify-space-between">
        <Avatar Player='Player1' border="crimson" />
        <div></div>
        <Avatar Player='Player2' border="royalblue" />
      </header>
      <main>
        <RelatiBoard
          value={game.board}
          onGridClick={handleGridClick}
          renderGrid={(grid) => (
            pieces[grid.symbol + '' + grid.status]
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
