import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        coord={this.props.coord}
        text={i}
      />
    );
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0,
      arr:[]
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    // 建立一个副本
    const squares = current.squares.slice();
    let arr = this.state.arr.slice();
    let coord;
    
    
    switch (i) {
      case 0:coord=[0,0];
      arr.push(coord);
      break;
      case 1:coord=[0,1];
      arr.push(coord);
      break;
      case 2:coord=[0,2];
      arr.push(coord);
      break;
      case 3:coord=[1,0];
      arr.push(coord);
      break;
      case 4:coord=[1,1];
      arr.push(coord);
      break;
      case 5:coord=[1,2];
      arr.push(coord);
      break;
      case 6:coord=[2,0];
      arr.push(coord);
      break;
      case 7:coord=[2,1];
      arr.push(coord);
      break;  
      case 8:coord=[2,2];
      arr.push(coord);
      break;  
    }

    console.log(arr);
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber:history.length,
      arr:arr
    })
  }

  jumpTo(step){
    this.setState({
      stepNumber:step,
      xIsNext:(step%2)===0
    })
  }
  
  run(){
    window.location.href="https://www.baidu.com/"
  }

  render() {
    let coord = 1;
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const arr = this.state.arr.slice();
    console.log(arr);
    const moves = history.map((step,move)=>{
      console.log(move);
      const desc = move ? "Go to move #" + move + "  coord:" +  arr[move-1] : "Go  to game start";
      return (
        <li key={move}>
          <button onClick={()=>this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status =`Next player:  ${this.state.xIsNext? 'X' : 'O'} `;
    }


    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div>
          <button onClick={this.run.bind(this)}>跳转</button>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
