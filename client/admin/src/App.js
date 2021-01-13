import Axios from "axios";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import ListUser from "./component/ListUser/ListUser";
import History from "./component/History/History";
import Login from "./component/Login/Login";
import HomeProvider from "./provider/HomeProvider";
import PopupProvider from "./provider/PopupProvider";

Axios.defaults.withCredentials = true;
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PopupProvider>
            <Route path="/login" component={Login}></Route>
            <Route exact path="/list-user">
              <HomeProvider>
                <ListUser></ListUser>
              </HomeProvider>
            </Route>
            <Route exact path="/history">
              <HomeProvider>
                <History></History>
              </HomeProvider>
            </Route>
            <Route exact path="/">
              <Redirect to="/list-user"/>
            </Route>
          </PopupProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
