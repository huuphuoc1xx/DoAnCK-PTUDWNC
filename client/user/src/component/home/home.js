import React from "react";
import AuthProvider from "../../provider/AuthProvider";
import Nav from "../Nav";
import ListUser from "./ListUser";


function Home(props) {
  return (
    <AuthProvider>
      <Nav />
      <div className="flex-container">
        <div className="main-container justify-content-center ">
          <div className="lobby col-md-8 col-lg-6 col-sm-12  mr-2">
            
          </div>
        </div>
        <div className='list-container'>
          <ListUser />
        </div>
      </div>

    </AuthProvider>
  );
}
export default Home;
