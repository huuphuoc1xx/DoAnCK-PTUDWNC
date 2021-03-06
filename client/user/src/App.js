import React from "react";
import Login from "./component/User/login";
import Home from "./component/home/home";
import Register from "./component/User/register";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import AuthProvider from "./provider/AuthProvider";
import { history } from './helpers/history';
import { PlayGame } from './component/playGame/playGame';
import { ListRoom } from './component/listRoom/listRoom';
import History from './component/History/History';
import Ranks from './component/ranks/ranks';
import Axios from "axios";
import "./App.css";
import PopupProvider from "./provider/PopupProvider";

Axios.defaults.withCredentials = true;
function App() {
  return (
    <div style={{ "margin": "0", height: "100%" }}>
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
            <Route exact path='/chessboard'>
              <ListRoom />
            </Route>
            <Route exact path="/history">
              <PopupProvider>
                <History />
              </PopupProvider>
            </Route>
            <Route exact path="/rank">
              <Ranks />
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
