import React, { useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../assets/circle.png';
import cross_icon from '../assets/cross.png';

const TicTacToe = () => {
  const initialBoardState = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoardState);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (board.every(cell => cell)) {
      setWinner('Draw');
    }
  };

  const resetGame = () => {
    setBoard(initialBoardState);
    setIsXNext(true);
    setWinner(null);
  };

  const renderSquare = (index) => {
    return (
      <div className="square" onClick={() => handleClick(index)}>
        {board[index] === 'X' && <img src={cross_icon} alt="X" />}
        {board[index] === 'O' && <img src={circle_icon} alt="O" />}
      </div>
    );
  };

  return (
    <div className='container'>
      <h1 className="title">Tic Tac Toe in <span>React</span></h1>
      <div className="board">
        {board.map((_, index) => renderSquare(index))}
      </div>
      <div className="info">
        {winner ? (
          <h2>{winner === 'Draw' ? 'It\'s a Draw!' : `Winner: ${winner}`}</h2>
        ) : (
          <h2>Next Player: {isXNext ? 'X' : 'O'}</h2>
        )}
      </div>
      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  );
};

export default TicTacToe;
