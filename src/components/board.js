import React from 'react'

const Board = props => {
  const { board, player, makeMove, winRow } = props
  return (
    <div className="board">
      {board.map(((cell, i) => (
        <div
          key={i}
          id={`cell-${i}`}
          className={winRow.includes(Number(i)) ? 'cell winner' : 'cell'}
          onClick={() => makeMove(i, player)}>
            {cell}
        </div>
      )))}
    </div>
  )
}

export default Board