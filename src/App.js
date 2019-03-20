import React, { Component } from 'react'
import './App.css'
import { emptyBoard, winningRows } from './data'
import Board from './components/board'
import ScoreBoard from './components/scoreBoard'
import Banner from './components/banner'

class App extends Component {
  state = {
    player: 'X',
    gameBoard: emptyBoard,
    gameOver: false,
    winningRow: [],
    X: 0,
    O: 0
  }

  togglePlayer = () => (
    this.setState((prevState) => {
      return { player: prevState.player === 'X' ? 'O' : 'X' }
    })
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
      return this.setState({
        gameOver: true,
        message: `Player ${player} has won!`,
        [player]:  this.state[player] + 1
      })
    }

    this.togglePlayer()
  }

  checkWin = (player) => {
    const { gameBoard } = this.state
    const boardValues = Object.values(gameBoard)
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
        }
      }
      if(playerHasWon) {
        break
      }
    }

    if(!boardValues.includes(null) && !playerHasWon) {
      this.setState({
        gameOver: true,
        message: `It's a draw!`,
      })
    }

    return playerHasWon
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
      gameBoard: emptyBoard,
      message: '',
      gameOver: false,
      player: 'X',
      winningRow: []
    })
  }


  render() {
    const { player, gameBoard, message, gameOver, X, O } = this.state

    return (
      <div className="App">
        <Banner message={message}/>
        <div className="game-container">
          <ScoreBoard playerX={X} playerO={O}/>
          <Board
            board={gameBoard}
            makeMove={this.makeMove}
            player={player}
          />
        </div>

        { gameOver &&
          <button className="reset" onClick={this.resetGame}>New Game</button>
        }
      </div>
    )
  }
}

export default App
