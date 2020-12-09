import React, {useState, useEffect} from "react";
import "./nav.css";
import { Navbar, Nav, Button, Form, FormControl } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import Axios from 'axios'
import config from '../config/config.json';
function NavHome(prop) {

    const [reDirect, setRedirect] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        Axios.get(`${config.base_path}`).then(res => {
            if(res.data.code!=0)
            {
                setIsLoaded(true);
            }else {
                setRedirect(<Redirect to="/login" />)
            }
        }).catch(
            setRedirect(<Redirect to="/login" />)
        )
    })

  return reDirect|| (
    <div className="flex-container">
      <div className="flex-children1">
        <div className="admin">Admin</div>
        <hr
          style={{
            marginRight: "10px",
            marginLeft: "10px",
            backgroundColor: "#D6D6DD",
          }}
        ></hr>
        <Link to={"/listUser"} className="linkDSUser">
          Danh sách user
        </Link>
      </div>
      <div className="flex-children2">
        <Navbar className="NavBar">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto"></Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar>
        {prop.children}
      </div>
    </div>
  );
}

export default NavHome;
