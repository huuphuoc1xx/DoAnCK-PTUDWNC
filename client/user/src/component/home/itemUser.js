import React from "react";
function User({ user }) {
  return (
    <>
      {
        <div>
          <div className="user">
            <img
              className="avater"
              src="https://nguoinoitieng.tv/images/nnt/97/0/bcjl.jpg"
            />
            <div className="userName">{user.username}</div>
          </div>
          <hr></hr>
        </div>
      }
    </>
  );
}
export default User;
