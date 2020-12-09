import React from 'react';
import './listUser.css'

function User({user}){


    return(
        <> <tr >
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.status}</td>
    </tr></>
    )

}

export default User;