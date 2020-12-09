import React, { useState, useEffect } from "react";
import Item from "./itemUser";

function listUser({ listUsers }) {
  const listUser = [
    { username: "Hồ Mình Khai", status: 1 },
    { username: "Trần Hoài An", status: 0 },
    { username: "Nguyễn Phương Linh", status: 1 },
    { username: "Hồ Mình Khai", status: 1 },
    { username: "Trần Hoài An", status: 1 },
    { username: "Nguyễn Phương Linh", status: 1 },
    { username: "Hồ Mình Khai", status: 1 },
    { username: "Trần Hoài An", status: 1 },
    { username: "Nguyễn Phương Linh", status: 1 },
    { username: "Hồ Mình Khai", status: 1 },
    { username: "Trần Hoài An", status: 1 },
    { username: "Nguyễn Phương Linh", status: 1 },
    { username: "Hồ Mình Khai", status: 1 },
    { username: "Trần Hoài An", status: 1 },
    { username: "Nguyễn Phương Linh", status: 1 },
    { username: "Hồ Mình Khai", status: 1 },
    { username: "Trần Hoài An", status: 1 },
    { username: "Nguyễn Phương Linh", status: 1 },
  ];
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
