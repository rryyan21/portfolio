"use client";
import { useState } from "react";
function flip(board: boolean[], index: number) {
  return board.map((on, i) =>
    Math.abs(Math.floor(i / 3) - Math.floor(index / 3)) +
      Math.abs((i % 3) - (index % 3)) <=
    1
      ? !on
      : on,
  );
}
const initial = [0, 4, 7].reduce(flip, Array<boolean>(9).fill(false));
export default function Arcade() {
  const [board, setBoard] = useState(initial);
  const [moves, setMoves] = useState(0);
  const won = board.every((on) => !on);
  return (
    <div className="arcade">
      <div className="lights-grid" role="group" aria-label="Lights out puzzle">
        {board.map((on, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Light, row ${Math.floor(i / 3) + 1}, column ${(i % 3) + 1}`}
            aria-pressed={on}
            onClick={() => {
              setBoard(flip(board, i));
              setMoves(moves + 1);
            }}
          >
            {on ? "✳" : "·"}
          </button>
        ))}
      </div>
      <p className="mono" aria-live="polite">
        {won
          ? "CHAPTER CLEARED. NICE WORK."
          : `${moves} MOVES / FOLLOW YOUR CURIOSITY`}
      </p>
      <button
        className="text-link"
        onClick={() => {
          setBoard(initial);
          setMoves(0);
        }}
        type="button"
      >
        Start again ↺
      </button>
    </div>
  );
}
