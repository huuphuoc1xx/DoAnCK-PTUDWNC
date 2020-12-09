import logo from './logo.svg';
import './App.css';
import Home from './components/home/home';
import ListUser from './components/listUser/listUser';
import Login from './components/admin/login';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path = '/login'>
          <Login/>
        </Route>
        <Route path = '/listUser'>
          <ListUser></ListUser>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  </>
  );
}

export default App;
