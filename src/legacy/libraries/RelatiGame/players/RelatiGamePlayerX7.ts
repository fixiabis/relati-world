import RelatiGame from "../RelatiGame";
import { Direction } from "gridboard";
import { HasPieceRelatiGrid, RelatiGamePlayer } from "../types";
import { convertBoardToPieceCodes } from "../utilities";

const nearbyDirections = ["F", "B", "L", "R", "FL", "FR", "BL", "BR"].map(Direction);

const evaluatedX7PointFromPlayerWithPieceCodes: Record<string, number> = {};

function evaluateByX7GameAndPlayer(game: RelatiGame, player: number) {
    const playerWithPieceCodes = player + convertBoardToPieceCodes(game.board);

    if (playerWithPieceCodes in evaluatedX7PointFromPlayerWithPieceCodes) {
        return evaluatedX7PointFromPlayerWithPieceCodes[playerWithPieceCodes];
    }

    const playerOPointFromGridIndexes = new Int8Array(game.board.grids.length);
    const playerXPointFromGridIndexes = new Int8Array(game.board.grids.length);

    for (let grid of game.board.grids) {
        if (!grid.piece) {
            playerOPointFromGridIndexes[grid.i] = -1;
            playerXPointFromGridIndexes[grid.i] = -1;
            continue;
        }

        playerOPointFromGridIndexes[grid.i] = 0;
        playerXPointFromGridIndexes[grid.i] = 0;
    }

    let isAllGridExplored: boolean = true;

    do {
        isAllGridExplored = true;

        for (let grid of game.board.grids as HasPieceRelatiGrid[]) {
            const isGridHasNotPlayerOPoint = playerOPointFromGridIndexes[grid.i] === -1;
            const isGridHasNotPlayerXPoint = playerXPointFromGridIndexes[grid.i] === -1;
            const isGridHasPointButPieceNotO = playerOPointFromGridIndexes[grid.i] === 0 && grid.piece.symbol !== "O";
            const isGridHasPointButPieceNotX = playerXPointFromGridIndexes[grid.i] === 0 && grid.piece.symbol !== "X";
            const isGridHasPointButPieceODisabled = playerOPointFromGridIndexes[grid.i] === 0 && grid.piece.symbol === "O" && grid.piece.disabled;
            const isGridHasPointButPieceXDisabled = playerXPointFromGridIndexes[grid.i] === 0 && grid.piece.symbol === "X" && grid.piece.disabled;

            evaluateGridPlayerOPoint: {
                if (isGridHasNotPlayerOPoint || isGridHasPointButPieceNotO || isGridHasPointButPieceODisabled) {
                    break evaluateGridPlayerOPoint;
                }

                for (let nearbyDirection of nearbyDirections) {
                    const nearbyGrid = grid.getGridTo(nearbyDirection);

                    if (!nearbyGrid) {
                        continue;
                    }

                    const isNearbyGridHasPoint = playerOPointFromGridIndexes[nearbyGrid.i] !== -1;

                    const isGridPointLessThanNearbyGridReferPoint =
                        playerOPointFromGridIndexes[grid.i] <
                        playerOPointFromGridIndexes[nearbyGrid.i] - 1;

                    if (!isNearbyGridHasPoint || isGridPointLessThanNearbyGridReferPoint) {
                        playerOPointFromGridIndexes[nearbyGrid.i] = playerOPointFromGridIndexes[grid.i] + 1;
                        isAllGridExplored = false;
                    }
                }
            }

            evaluateGridPlayerXPoint: {
                if (isGridHasNotPlayerXPoint || isGridHasPointButPieceNotX || isGridHasPointButPieceXDisabled) {
                    break evaluateGridPlayerXPoint;
                }

                for (let nearbyDirection of nearbyDirections) {
                    const nearbyGrid = grid.getGridTo(nearbyDirection);

                    if (!nearbyGrid) {
                        continue;
                    }

                    const isNearbyGridHasPoint = playerXPointFromGridIndexes[nearbyGrid.i] !== -1;

                    const isGridPointLessThanNearbyGridReferPoint =
                        playerXPointFromGridIndexes[grid.i] <
                        playerXPointFromGridIndexes[nearbyGrid.i] - 1;

                    if (!isNearbyGridHasPoint || isGridPointLessThanNearbyGridReferPoint) {
                        playerXPointFromGridIndexes[nearbyGrid.i] = playerXPointFromGridIndexes[grid.i] + 1;
                        isAllGridExplored = false;
                    }
                }
            }
        }
    } while (!isAllGridExplored);

    // console.log(playerOPointFromGridIndexes, playerXPointFromGridIndexes);

    // printBoardContent(game.board);
    // printPointContent(playerOPointFromGridIndexes);
    // printPointContent(playerXPointFromGridIndexes);

    if (player === 0) {
        const evaluatedPoint = playerOPointFromGridIndexes.reduce((r, v, i) => {
            if (v === 0) {
                return r;
            }
            else if (v === -1) {
                return r - 49;
            }
            else if (playerXPointFromGridIndexes[i] === -1) {
                return r + 49;
            }
            else {
                return r + ((49 - v) - (49 - playerXPointFromGridIndexes[i]));
            }
        }, 0);

        return evaluatedX7PointFromPlayerWithPieceCodes[playerWithPieceCodes] = evaluatedPoint;
    }
    else {
        const evaluatedPoint = playerXPointFromGridIndexes.reduce((r, v, i) => {
            if (v === 0) {
                return r;
            }
            else if (v === -1) {
                return r - 49;
            }
            else if (playerOPointFromGridIndexes[i] === -1) {
                return r + 49;
            }
            else {
                return r + ((49 - v) - (49 - playerOPointFromGridIndexes[i]));
            }
        }, 0);

        return evaluatedX7PointFromPlayerWithPieceCodes[playerWithPieceCodes] = evaluatedPoint;
    }
}

function evaluateUseDeepThinkingByX7GameAndPlayerAndDepth(
    game: RelatiGame,
    player: number,
    depth: number = 0,
    nowPlayer: number = player,
    alpha: number = -Infinity,
    beta: number = +Infinity,
) {
    if (depth === 0) {
        const point = evaluateByX7GameAndPlayer(game, player);
        // printBoardContent(game.board);
        // console.log(nowPlayer, point);
        return point;
    }

    if (player === nowPlayer) {
        let point = -Infinity;

        for (let grid of game.board.grids) {
            const isGridPlaceable = game.validateIsPlayerCanDoPlacement(grid, nowPlayer);

            if (!isGridPlaceable) {
                continue;
            }

            // console.group("alpha", grid);
            game.doPlacementByCoordinateAndPlayer(grid.x, grid.y, nowPlayer);
            game.reenableAllPieces();

            point = Math.max(point, evaluateUseDeepThinkingByX7GameAndPlayerAndDepth(
                game,
                player,
                depth - 1,
                nowPlayer ? 0 : 1,
                alpha,
                beta,
            ));

            game.undo();
            alpha = Math.max(alpha, point);
            // console.groupEnd();
            // console.log(point);

            if (beta <= alpha) {
                break;
            }
        }

        return point;
    }
    else {
        let point = Infinity;

        for (let grid of game.board.grids) {
            const isGridPlaceable = game.validateIsPlayerCanDoPlacement(grid, nowPlayer);

            if (!isGridPlaceable) {
                continue;
            }

            // console.group("beta", grid);
            game.doPlacementByCoordinateAndPlayer(grid.x, grid.y, nowPlayer);
            game.reenableAllPieces();

            point = Math.min(point, evaluateUseDeepThinkingByX7GameAndPlayerAndDepth(
                game,
                player,
                depth - 1,
                nowPlayer ? 0 : 1,
                alpha,
                beta,
            ));

            game.undo();
            beta = Math.min(beta, point);
            // console.groupEnd();
            // console.log(point);

            if (beta <= alpha) {
                break;
            }
        }

        return point;
    }
}

const RelatiGamePlayerX7: RelatiGamePlayer = {
    getGridIndexForPlacementByGameAndPlayer(game: RelatiGame, player: number, level: number) {
        const gridIndexWithPoints: [number, number][] = [];

        // console.log(`turn: ${game.turn}`);

        for (let grid of game.board.grids) {
            const isGridPlaceable = game.validateIsPlayerCanDoPlacement(grid, player);

            if (!isGridPlaceable) {
                continue;
            }

            game.doPlacementByCoordinateAndPlayer(grid.x, grid.y, player);

            const point = evaluateUseDeepThinkingByX7GameAndPlayerAndDepth(game, player, level, player ? 0 : 1);
            gridIndexWithPoints.push([grid.i, point]);

            // console.log(`coord: (${grid.x}, ${grid.y}) = ${point}`);
            game.undo();
        }

        gridIndexWithPoints.sort(([, pointA], [, pointB]) => pointA > pointB ? -1 : 1);

        if (gridIndexWithPoints[0]) {
            const bestGridIndexWithPoints = gridIndexWithPoints.filter(([, point]) => gridIndexWithPoints[0][1] === point);
            return bestGridIndexWithPoints[Math.floor(Math.random() * bestGridIndexWithPoints.length)][0];
        }
        else {
            return -1;
        }
    },
    doPlacementByGameAndPlayer(game: RelatiGame, player: number, level: number) {
        const gridIndex = RelatiGamePlayerX7.getGridIndexForPlacementByGameAndPlayer(game, player, level);

        if (gridIndex !== -1) {
            const grid = game.board.grids[gridIndex];
            game.doPlacementByCoordinateAndPlayer(grid.x, grid.y, player);
        }
    },
};

export default RelatiGamePlayerX7;
