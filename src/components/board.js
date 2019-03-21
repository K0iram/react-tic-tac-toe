import React from 'react'


const Board = props => {
  const { board, player, makeMove } = props
  const tiles = Object.keys(board)
  return (
    <div className="board">
      {tiles.map((cell => (
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