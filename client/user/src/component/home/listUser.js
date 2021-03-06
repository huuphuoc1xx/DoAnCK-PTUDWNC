import React, { useState, useEffect } from "react";
import Item from "./itemUser";
import './home.css';
import { useSelector } from 'react-redux';
function ListUser() {
  let listUser = false;
  listUser = useSelector(state => state.userReduce.listUser);
  return <>
    <div className="list-container">
      {listUser && listUser.map((user) => (
        <Item user={user}></Item>
      ))}
    </div>
  </>;
}
export default ListUser;
