import React, { useEffect } from "react";
import Login from "./component/User/login";
import Home from "./component/home/home";
import Register from "./component/User/register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import AuthProvider from "./provider/AuthProvider";
function App() {
  const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            
            dispatch(alertActions.clear());
        });
    }, []);
  return (
    <>
      <Router history = {history}>
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
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
