import React, { Component } from 'react'
import './App.css'

const winningRows = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [6, 4, 2],
  [0, 4, 8]
]

class App extends Component {
  state = {
    player: 'X',
    gameBoard: {
      0: null,
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null
    },
    gameOver: false,
    winningRow: []
  }

  togglePlayer = () => (
    this.state.player === "X"
      ?
      this.setState({player: "O"})
      :
      this.setState({player: "X"})
  )

  makeMove = (position, player) => {
    const { gameBoard, gameOver } = this.state

    if(gameOver){
      return
    }

    if(gameBoard[position] !== null) {
      return alert('Sorry That Spot Is Taken, Choose Again.')
    }

    gameBoard[position] = player

    if (this.checkWin(player)) {
      this.setState({
        gameOver: true,
        message: `Player ${player} has won!`
      })
    }

    if (this.checkDraw(player)) {
      this.setState({
        gameOver: true,
        message: `It's a draw!`
      })
    }

    this.togglePlayer()
  }

  checkWin = (player) => {
    const { gameBoard } = this.state
    let playerHasWon = false

    for (let i = 0; i < winningRows.length; i++) {
      let positionStore = []
      let winRow = []
      for (let j = 0; j < winningRows[i].length; j++) {
        let currentPosition = winningRows[i][j]

        if (gameBoard[currentPosition] === player) {
          positionStore.push(player)
          winRow.push(currentPosition)
        }

        if (positionStore.length >= 3) {
          this.setWinStyle(winRow)
          playerHasWon = true
          break
        }
      }
      if(playerHasWon){
        break
      }
    }

    return playerHasWon
  }

  checkDraw = (player) => {
    const boardValues = Object.values(this.state.gameBoard)
    let draw = false

    !boardValues.includes(null) && !this.checkWin(player) ?
      draw = true
    :
      draw = false

    return draw
  }

  setWinStyle = (row) => {
    row.forEach(cell => {
      return document.getElementById(`cell-${cell}`).classList.add('winner')
    })
  }

  resetGame = () => {
    let els = document.querySelectorAll('.cell.winner')
    for (let i = 0; i < els.length; i++) {
      els[i].classList.remove('winner')
    }
    this.setState({
      gameBoard: {
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null
      },
      message: '',
      gameOver: false,
      player: 'X',
      winningRow: []
    })
  }


  render() {
    const { player, gameBoard, message, gameOver } = this.state

    return (
      <div className="App">
        <div className="banner-container">
          { message !== '' && <h1 className="banner">{message}</h1> }
        </div>

        <div className="board">
          {Object.keys(gameBoard).map((cell => (
            <div
              key={cell}
              id={`cell-${cell}`}
              className="cell"
              onClick={() => this.makeMove(cell, player)}>
                {gameBoard[cell]}
            </div>
          )))}

        </div>

        { gameOver &&
          <button className="reset" onClick={this.resetGame}>New Game</button>
        }
      </div>
    )
  }
}

export default App
