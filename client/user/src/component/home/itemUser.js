import React from "react";
function User({ user }) {
  return (
    <>
      {
        <div>
          <div className="user">
            <img
              className="avatar"
              src="https://giupban.com.vn/wp-content/uploads/2019/09/hinh-anh-hot-girl-de-thuong-19.jpg"
            />
            <div className="userName">{user.username}</div>
          </div>
          <br/>
        </div>
      }
    </>
  );
}
export default User;
