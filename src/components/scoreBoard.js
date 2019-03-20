import React from 'react'

const ScoreBoard = props => {
  const { playerX, playerO } = props

  return (
    <div className="game-counter">
      <h3>Score</h3>
      <h5>X: {playerX}</h5>
      <h5>O: {playerO}</h5>
    </div>
  )
}

export default ScoreBoard