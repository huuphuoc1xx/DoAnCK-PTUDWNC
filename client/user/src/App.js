import React from "react";
import Login from "./component/User/login";
import Home from "./component/home/home";
import Register from "./component/User/register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import AuthProvider from "./provider/AuthProvider";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <AuthProvider>
              <Home />
            </AuthProvider>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
