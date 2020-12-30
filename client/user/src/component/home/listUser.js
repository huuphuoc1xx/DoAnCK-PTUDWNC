import React, { useState, useEffect } from "react";
import Item from "./itemUser";

function listUser({ listUser }) {
  console.log(listUser)
  return (
    <>
      <div>
        {listUser.map((user) => (
          <Item user={user}></Item>
        ))}
      </div>
    </>
  );
}
export default listUser;
