import React from 'react';
import Square from './Square';

const Board = ({ squares, onClick }) => {
    return ( 
        <div className = "board"> 
        {
            squares.map((square, i) => (
                <Square key = { `square_${i}` }
                    value = { square }
                    onClick = {() => onClick(i) }
                />
            ))
        } 
        </div>
    )
}

export default Board;