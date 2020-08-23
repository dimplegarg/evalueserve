import React, {useState, useEffect, Fragment} from 'react';
import Board from './Board';

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXisNext] = useState(null);
    const [playerName, setPlayerName] = useState('X')
    const winner = calculateWinner(history[stepNumber], playerName);
    const x0 = xIsNext ? 'X' : 'O';

    useEffect(() => {
        let name = prompt('Enter first name');
        if(name) {
            setPlayerName(name);
        }
    },[])

    const handleToss = () => {
        // 0 === 1st player === X
        // 1 === 2nd player === O
        const result = Math.round(Math.random());
        setXisNext(result ? false : true);
    }

    const handleClick = (i) => {
        const historyPoint = history.slice(0, stepNumber+1);
        const current = historyPoint[stepNumber];
        const squares = [...current];

        // return if won or occupied
        if(winner || squares[i]) return ;

        // select square
        squares[i] = x0;
        setHistory([...historyPoint, squares])
        setStepNumber(historyPoint.length);
        setXisNext(!xIsNext)
    }

    

    return (
        <div className="gameContainer">
            <h1>React Tic Tac Toe</h1>
            {xIsNext === null ? 
            <div className="buttonContainer">
                <button type="button" onClick={handleToss} className="btn btn-danger">Toss</button>
            </div>
            :
            <Fragment>
                <Board squares={history[stepNumber]} onClick={handleClick} />
                <h3>{winner ? `Winner: ${winner}` : `Next Player: ${x0 === 'X' ? playerName : x0}`}</h3>
                <div className="buttonContainer" style={{marginLeft:20}}>
                    <button type="button" onClick={() => { setStepNumber(0); setXisNext(true)}} className="btn btn-danger">Reset </button>
                </div>
            </Fragment>
            }

        </div>
    )
}

function calculateWinner(squares, playerName) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for(let i = 0; i < lines.length; i++) {
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a] === 'X' ? playerName : squares[a];
        }
    }
    return null;
}

export default Game;