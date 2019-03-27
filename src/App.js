import React, { Component } from 'react'
import './App.css'
import { emptyBoard, winningRows } from './data'
import Board from './components/board'
import ScoreBoard from './components/scoreBoard'
import Banner from './components/banner'
import {signUp, signIn} from './api'

class App extends Component {
  constructor(props) {
    super(props)

    const initialBoard = Object.assign({}, emptyBoard)

    this.state = {
      player: 'X',
      gameBoard: initialBoard,
      gameOver: false,
      winningRow: [],
      X: 0,
      O: 0,
      email: '',
      username: '',
      password: ''
    }
  }

  togglePlayer = () => (
    this.setState((prevState) => {
      return { player: prevState.player === 'X' ? 'O' : 'X' }
    })
  )

  makeMove = (position, player) => {
    const { gameBoard, gameOver } = this.state

    if(gameOver){
      return false
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
    this.setState({winningRow: row})
  }

  resetGame = () => {
    const initialBoard = Object.assign({}, emptyBoard)
    this.setState({
      gameBoard: initialBoard,
      message: '',
      gameOver: false,
      player: 'X',
      winningRow: []
    })
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSignUp = (e) => {
    e.preventDefault()
    const {email, username, password} = this.state
    const cred = {
      "username": username,
      "email": email,
      "password": password
    }

    signUp(cred).then(data => console.log(data))
  }

   onSignIn = (e) => {
    e.preventDefault()
    const {email, password} = this.state
    const user = {
      "email": email,
      "password": password
    }

    signIn(user).then(data => console.log(data))
  }


  render() {
    const { player, gameBoard, message, gameOver, X, O, winningRow, email, username, password } = this.state

    return (
      <div className="App">
        <Banner message={message}/>
        <div className="game-container">
          <ScoreBoard playerX={X} playerO={O}/>
          <Board
            board={gameBoard}
            makeMove={this.makeMove}
            player={player}
            winRow={winningRow}
          />
        </div>

        { gameOver &&
          <div className="reset">
            <button className="reset" onClick={this.resetGame}>New Game</button>
          </div>
        }

        <div>
          <form onSubmit={this.onSignUp}>
            <input type="text" value={email} placeholder="Email" name="email" onChange={this.onInputChange}/>
            <input type="text" value={username} placeholder="Username" name="username" onChange={this.onInputChange}/>
            <input type="text" value={password} placeholder="Password" name="password" onChange={this.onInputChange}/>
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div>
          <form onSubmit={this.onSignIn}>
            <input type="text" value={email} placeholder="Email" name="email" onChange={this.onInputChange}/>
            <input type="text" value={password} placeholder="Password" name="password" onChange={this.onInputChange}/>
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    )
  }
}

export default App
