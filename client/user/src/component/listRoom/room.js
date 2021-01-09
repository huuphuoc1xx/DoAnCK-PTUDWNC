import React from 'react';
import './index.css';
export const Room = (props) => {
    return(
        <>
        <button onClick={() => props.handleSubmit(props.room.room)} className = 'room'>
            <div>
                Id: {props.room.room}
            </div>
            <div>
                Status:{props.room.room?1:2} 
            </div>
        </button>
        </>
    )
}