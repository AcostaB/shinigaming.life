import React from "react";
import GamePiece from "./GamePiece";
import "./Board.css";
import { find } from "lodash";

const Board = ({ board, clickHandler, activeCell, validMoves }) => {
  let boardUI = [];
  for (var y = 7; y >= 0; y--) {
    for (var x = 0; x <= 7; x++) {
      boardUI.push(
        <div
          onClick={clickHandler}
          className={`boardCell ${isRedCell(x, y) ? "red" : ""} 
            ${
              find(validMoves, move => move.x === x && move.y === y)
                ? "validMove"
                : ""
            }
            ${activeCell.x === x && activeCell.y === y ? "activeCell" : ""}`}
          data-x={x}
          data-y={y}
        >
          {board[x][y] > 0 && <GamePiece pieceType={board[x][y]} />}
        </div>
      );
    }
  }
  return <div className="boardUI">{boardUI}</div>;
};

const isRedCell = (x, y) =>
  (x % 2 === 1 && y % 2 === 0) || (x % 2 === 0 && y % 2 === 1);

export default Board;
