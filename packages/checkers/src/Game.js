import React from "react";
import Board from "./Board";
import "./Board.css";

import { find, cloneDeep } from "lodash";

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      isPlayerOneTurn: true,
      board: createFreshBoard(),
      activeCell: {},
      validMoves: {}
    };
  }

  cellClickHandler = e => {
    const x = parseInt(e.currentTarget.dataset.x);
    const y = parseInt(e.currentTarget.dataset.y);

    let newValidMoves;

    const { board, isPlayerOneTurn, validMoves } = this.state;

    // If current move coordinates is part of valid moves collection, then it is a move. Update state and bail.
    if (find(validMoves, move => move.x === x && move.y === y)) {
      this.setState(prevState => {
        const newBoard = cloneDeep(prevState.board);
        const oldX = prevState.activeCell.x;
        const oldY = prevState.activeCell.y;
        const oldPieceType = prevState.activeCell.pieceType;

        newBoard[oldX][oldY] = 0;
        if (Math.abs(x - oldX) === 2) {
          newBoard[Math.abs(x + oldX) / 2][Math.abs(y + oldY) / 2] = 0;
        }
        newBoard[x][y] = oldPieceType;

        return {
          ...prevState,
          validMoves: {},
          activeCell: {},
          board: newBoard,
          isPlayerOneTurn: !prevState.isPlayerOneTurn
        };
      });

      return;
    }

    if (isPlayerOneTurn && containsRedPiece(x, y, board)) {
      newValidMoves = findValidMoves(x, y, this.state.board);
    } else if (!isPlayerOneTurn && containsBlackPiece(x, y, board)) {
      newValidMoves = findValidMoves(x, y, this.state.board);
    } else {
      return;
    }

    this.setState(prevState => ({
      ...prevState,
      validMoves: newValidMoves,
      activeCell: { x, y, pieceType: board[x][y] }
    }));
  };

  render = () => {
    const { board, activeCell, validMoves } = this.state;

    return (
      <Board
        board={board}
        activeCell={activeCell}
        validMoves={validMoves}
        clickHandler={this.cellClickHandler}
      />
    );
  };
}

const createFreshBoard = () => {
  // const newBoard = new Array(8).fill(new Array(8).fill(0)); -> Issue passing by reference
  const newBoard = [
    new Array(8).fill(0),
    new Array(8).fill(0),
    new Array(8).fill(0),
    new Array(8).fill(0),
    new Array(8).fill(0),
    new Array(8).fill(0),
    new Array(8).fill(0),
    new Array(8).fill(0)
  ];

  // Set all the red pieces
  newBoard[0][0] = 1;
  newBoard[2][0] = 1;
  newBoard[4][0] = 1;
  newBoard[6][0] = 1;

  newBoard[1][1] = 1;
  newBoard[3][1] = 1;
  newBoard[5][1] = 1;
  newBoard[7][1] = 1;

  newBoard[0][2] = 1;
  newBoard[2][2] = 1;
  newBoard[4][2] = 1;
  newBoard[6][2] = 1;

  // Set all the black pieces
  newBoard[1][5] = 2;
  newBoard[3][5] = 2;
  newBoard[5][5] = 2;
  newBoard[7][5] = 2;

  newBoard[0][6] = 2;
  newBoard[2][6] = 2;
  newBoard[4][6] = 2;
  newBoard[6][6] = 2;

  newBoard[1][7] = 2;
  newBoard[3][7] = 2;
  newBoard[5][7] = 2;
  newBoard[7][7] = 2;

  return newBoard;
};

const containsPiece = (x, y, board) => board[x][y] !== 0;

const containsRedPiece = (x, y, board) =>
  board[x][y] === 1 || board[x][y] === 3;

const containsBlackPiece = (x, y, board) =>
  board[x][y] === 2 || board[x][y] === 4;

const findValidMoves = (x, y, board) => {
  let validMoves = [];
  const isRed = containsRedPiece(x, y, board);
  const isBlack = containsBlackPiece(x, y, board);
  const isCrowned = board[x][y] === 3 || board[x][y] === 4;

  // If red piece clicked...
  if (isRed) {
    // Check for valid moves up and left.
    if (!containsPiece(x - 1, y + 1, board)) {
      validMoves.push({ x: x - 1, y: y + 1, jump: false });
    }

    // Check for valid move up and right
    if (!containsPiece(x + 1, y + 1, board)) {
      validMoves.push({ x: x + 1, y: y + 1, jump: false });
    }

    // Check for valid jump up and left
    if (
      !containsPiece(x - 2, y + 2, board) &&
      containsBlackPiece(x - 1, y + 1, board)
    ) {
      validMoves.push({ x: x - 2, y: y + 2, jump: true });
    }

    // Check for valid jump up and right
    if (
      !containsPiece(x + 2, y + 2, board) &&
      containsBlackPiece(x + 1, y + 1, board)
    ) {
      validMoves.push({ x: x + 2, y: y + 2, jump: true });
    }

    // If piece is crowned...
    if (isCrowned) {
      // Check for valid moves down and left.
      if (!containsPiece(x - 1, y - 1, board)) {
        validMoves.push({ x: x + 2, y: y + 2, jump: false });
      }

      // Check for valid move down and right
      if (!containsPiece(x + 1, y - 1, board)) {
        validMoves.push({ x: x + 1, y: y - 1, jump: false });
      }

      // Check for valid jump down and left
      if (
        !containsPiece(x - 2, y - 2, board) &&
        containsBlackPiece(x - 1, y - 1, board)
      ) {
        validMoves.push({ x: x - 2, y: y - 2, jump: true });
      }

      // Check for valid jump down and right
      if (
        !containsPiece(x + 2, y - 2, board) &&
        containsBlackPiece(x + 1, y - 1, board)
      ) {
        validMoves.push({ x: x + 2, y: y - 2, jump: true });
      }
    }
  }

  // If black piece clicked...
  if (isBlack) {
    // Check for valid moves down and left.
    if (!containsPiece(x - 1, y - 1, board)) {
      validMoves.push({ x: x - 1, y: y - 1, jump: false });
    }

    // Check for valid move down and right
    if (!containsPiece(x + 1, y - 1, board)) {
      validMoves.push({ x: x + 1, y: y - 1, jump: false });
    }

    // Check for valid jump down and left
    if (
      !containsPiece(x - 2, y - 2, board) &&
      containsRedPiece(x - 1, y - 1, board)
    ) {
      validMoves.push({ x: x - 2, y: y - 2, jump: true });
    }

    // Check for valid jump down and right
    if (
      !containsPiece(x + 2, y - 2, board) &&
      containsRedPiece(x + 1, y - 1, board)
    ) {
      validMoves.push({ x: x + 2, y: y - 2, jump: true });
    }

    // If piece is crowned...
    if (isCrowned) {
      // Check for valid moves up and left.
      if (!containsPiece(x - 1, y + 1, board)) {
        validMoves.push({ x: x - 1, y: y + 2, jump: false });
      }

      // Check for valid move up and right
      if (!containsPiece(x + 1, y + 1, board)) {
        validMoves.push({ x: x + 1, y: y + 1, jump: false });
      }

      // Check for valid jump up and left
      if (
        !containsPiece(x - 2, y + 2, board) &&
        containsRedPiece(x - 1, y + 1, board)
      ) {
        validMoves.push({ x: x - 2, y: y + 2, jump: true });
      }

      // Check for valid jump up and right
      if (
        !containsPiece(x + 2, y + 2, board) &&
        containsRedPiece(x + 1, y + 1, board)
      ) {
        validMoves.push({ x: x + 2, y: y + 2, jump: true });
      }
    }
  }

  return validMoves;
};

export default Game;
