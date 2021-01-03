import React from "react";
import Login from "./component/User/login";
import Home from "./component/Home/Home";
import Register from "./component/User/register";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import AuthProvider from "./provider/AuthProvider";
import { history } from './helpers/history';
import { PlayGame } from './component/PlayGame/PlayGame';
import Axios from "axios";
import "./App.css";

Axios.defaults.withCredentials = true;
function App() {
  return (
    <div style={{ "margin": "0" }}>
      <Router history={history}>
        <Switch>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login" component={Login}>
          </Route>
          <AuthProvider>
            <Route exact path='/playgame'>
              <PlayGame />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </AuthProvider>
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
