import React from 'react';
import Square from './square';
import '../playGame.css';

function Board(props){
    let result = [];
    for (let i = 0; i < props.row; i++) {
      let totalCol = [];
      for (let j = 0; j < props.col; j++) {
        if(props.a==(props.col) * i + j||props.b==(props.col) * i + j||props.c==(props.col) * i + j)
        {
          let c = <Square 
          value={props.squares[(props.col) * i + j]}
          onClick={() => props.onClick((props.col) * i + j)}
        />
        totalCol.push(c);
        continue;
        }

        let c = <Square 
          value={props.squares[(props.col) * i + j]}
          onClick={() => props.onClick((props.col) * i + j)}
        />
        totalCol.push(c);
      };
      let r = <div className="board-row">{totalCol}</div>
      result.push(r);
    }
    return (
      <div> {result}</div>
    );


}

export default Board