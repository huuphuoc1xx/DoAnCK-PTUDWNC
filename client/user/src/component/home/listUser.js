import React, { useState, useEffect } from "react";
import Item from "./itemUser";

function ListUser({ listUser }) {
  console.log(listUser)
  return (
    <>
      <div className = "divListUser">
        
          <Item user={'ppp'}></Item>
       
      </div>
    </>
  );
}
export default ListUser;
