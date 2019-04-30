import React from "react";
import "./GamePiece.css";

const GamePiece = ({ pieceType }) => {
  let pieceClass;
  if (pieceType === 1) {
    pieceClass = "red";
  } else if (pieceType === 2) {
    pieceClass = "black";
  } else if (pieceType === 3) {
    pieceClass = "red crowned";
  } else if (pieceType === 4) {
    pieceClass = "black crowned";
  }

  return <div className={`gamePiece ${pieceClass}`} />;
};

export default GamePiece;
