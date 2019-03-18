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
    gameOver: false
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
    } else {
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

  }

  checkWin = (player) => {
    const { gameBoard } = this.state
    let playerHasWon = false

    for (let i = 0; i < winningRows.length; i++) {
      let positionStore = []
      for (let y = 0; y < winningRows[i].length; y++) {
        let currentPosition = winningRows[i][y]

        if (gameBoard[currentPosition] === player) {
          positionStore.push(player)
        }

        if (positionStore.length > 2) {
          playerHasWon = true
        }
      }
    }

    return playerHasWon
  }

  checkDraw = (player) => {
    const boardValues = Object.values(this.state.gameBoard)
    let draw = false

    for (let i = 0; i < boardValues.length; i++) {
      if (!boardValues[i]){
        return draw = false
      } else if( i >= boardValues.length - 1 && !this.checkWin(player)){
         return draw = true
      }
    }

    return draw
  }

  clearBoard = () => {
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
      player: 'X'
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
            <div className={`cell ${gameBoard[cell] !== null ? `taken-${gameBoard[cell]}` : ''}`} id={`pos-${cell}`} onClick={() => this.makeMove(cell, player)}>{gameBoard[cell]}</div>
          )))}

        </div>

        { gameOver && <button className="reset" onClick={this.clearBoard}>New Game</button> }
      </div>
    )
  }
}

export default App
