import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props)  {
    
      return (
        <button className="square" onClick={props.onClick}>
          {props.value}
        </button>
      );

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
  class Board extends React.Component {

    renderSquare(i) {
      return (
            <Square 
                value={this.props.squares[i]} 
                onClick={() => this.handleClick(i)}
            />
      );
    }

    handleClick (i) {
        const lSquares = this.props.squares.slice();
        if(calculateWinner(lSquares) || lSquares[i]){
          return;
        }

        lSquares[i] = (this.props.xIsNext)?'X':'O';
        this.setState({
          squares: lSquares,
          xIsNext: !this.props.xIsNext,
        });
    }


  
    render() {
      const winner = calculateWinner(this.props.squares);
      let status;
      if(winner){
        status = winner +' a gagné';
      }else{
        status = 'Next player: '+(this.props.xIsNext ? 'X' : 'O');
      }
      
  
      return (
        <div>
          <div className="status">{status}</div>
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
    constructor(props){
      super(props);
      this.state={
        history:[{
          squares: Array(0).fill(null),
          xIsNext: true,
        }],
      }
    }
    getHistorySnapshot(i){
      
    }
    render() {
      return (
        
        
        <div className="game">
          <div className="game-board">
            <Board squares={this.state.history[this.state.history.length-1].squares} xIsNext={this.state.history[this.state.history.length-1].xIsNext} /> 
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  