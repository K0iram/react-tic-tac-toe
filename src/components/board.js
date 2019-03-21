import React from 'react'


const Board = props => {
  const { board, player, makeMove, winRow } = props
  const tiles = Object.keys(board)
  return (
    <div className="board">
      {tiles.map((cell => (
        <div
          key={cell}
          id={`cell-${cell}`}
          className={winRow.includes(Number(cell)) ? 'cell winner' : 'cell'}
          onClick={() => makeMove(cell, player)}>
            {board[cell]}
        </div>
      )))}
    </div>
  )
}

export default Board