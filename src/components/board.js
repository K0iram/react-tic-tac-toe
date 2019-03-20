import React from 'react'


const Board = props => {
  const { board, player, makeMove } = props
  return (
    <div className="board">
      {Object.keys(board).map((cell => (
        <div
          key={cell}
          id={`cell-${cell}`}
          className="cell"
          onClick={() => makeMove(cell, player)}>
            {board[cell]}
        </div>
      )))}
    </div>
  )
}

export default Board