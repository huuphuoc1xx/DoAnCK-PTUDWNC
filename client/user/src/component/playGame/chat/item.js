import React from 'react';
import './chat.css';
function Item(props) {
    return (
        <div style={{"display":"flex"}}>
            <span className ='name'>{props.username}: </span>
            <span className = 'mess'>{props.mess}</span>
        </div>
    );
}

export default Item;