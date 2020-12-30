import React, { useEffect } from "react";
import Login from "./component/User/login";
import Home from "./component/home/home";
import Register from "./component/User/register";
import { Router, Switch, Route, Redirect} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import AuthProvider from "./provider/AuthProvider";
import { history } from './helpers/history';
import { alertConstants } from './constans/alert.contants';
import { alertActions } from './actions/alert';
import { PlayGame } from '../src/component/playGame/playGame';
function App() {
  return (
    <div style={{"margin":"0"}}>
      <Router history={history}>
        <Switch>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login" component={Login}>
          </Route>
          <AuthProvider>
            <Route exact path = '/playgame'>
              <PlayGame/>
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
