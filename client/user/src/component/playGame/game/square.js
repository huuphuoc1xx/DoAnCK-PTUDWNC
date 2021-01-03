import React from 'react';
import '../PlayGame.css';
function Square(props) {
  return (
    <button  className = {` ${1==2? "winner" : "square"}`} onClick={props.onClick}>
      {props.value}
    </button>
  );
}
export default Square;