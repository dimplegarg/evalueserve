import React from 'react';

export default (props) => (
    <div className="mainContainer homeContainer">
        <div className="buttonContainer">
            <button type="button" onClick={() => props.history.push('/user-list')} className="btn btn-danger">PROGRAM 1</button>
        </div>
        <div className="buttonContainer">
            <button type="button" onClick={() => props.history.push('/tic-tac-toe')} className="btn btn-danger">PROGRAM 2</button>
        </div>
    </div>
)