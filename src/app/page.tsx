"use client";

import { useState } from 'react';

type Player = 'X' | 'O' | null;

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<Player>(null);

  const handleClick = (index: number): void => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setWinner(winner);
      setGameOver(true);
    } else if (checkDraw(newBoard)) {
      setGameOver(true);
    }
  };

  const calculateWinner = (squares: Player[]): Player => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const checkDraw = (squares: Player[]): boolean => {
    return squares.every(square => square !== null);
  };

  const resetGame = (): void => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setWinner(null);
  };

  const status = winner
    ? `Congratulations to ${winner}!`
    : checkDraw(board)
    ? 'The match is Draw!'
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Tic-Tac-Toe</h1>
      {gameOver ? (
        <div className="text-center">
          <div className={`text-3xl font-bold mb-4 ${winner ? 'winner-animation' : 'draw-animation'}`}>
            {winner ? `Congratulations to Player ${winner}!` : 'The match is Draw!'}
          </div>
          <div className="arrow-container mt-4">
            <div className="arrow"></div>
          </div>
          <button
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transform transition-transform hover:scale-110"
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>
      ) : (
        <>
          <div className="text-xl font-semibold mb-4">{status}</div>
          <div className="grid grid-cols-3 gap-3">
            {board.map((value, index) => (
              <button
                key={index}
                className={`w-24 h-24 bg-white border-2 border-gray-400 text-4xl font-bold flex items-center justify-center
                            transition-transform transform hover:scale-105 hover:bg-gray-200
                            ${value === 'X' ? 'text-red-500' : 'text-blue-500'}`}
                onClick={() => handleClick(index)}
              >
                {value}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TicTacToe;
