import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import Nav from "../component/Nav";
import config from "../config/config.json"

export const HomeContext = createContext(null);
const useUser = () => useContext(HomeContext);


export default function HomeProvider(props) {
  const [user, setUser] = useState(null);
  const history = useHistory();
  useEffect(() => {
    axios.get(`${config.dev.path}/login/validate`).then(res => {
      if (res.data.code === 0)
        setUser(res.data.data.user);
      else throw res.data.data;
    }).catch(err => {
      console.log(err);
      history.push(`/login?redirect_url=${window.location.href}`);
    })
  }, []);

  const matchList = useRouteMatch("/list-user");
  const matchHistory = useRouteMatch("/history");
  if (!user)
    return <></>;

  return (
    <HomeContext.Provider value={user}>
      <div style={{ height: "100%" }}>
        <Nav />
        <div className="fill d-flex">
          <div className="side-bar">
            <Link to="/list-user">
              <div className={`side-bar-item ${matchList ? "" : "item-disable"}`}>
                List User
                        </div>
            </Link>
            <Link to="/history">
              <div className={`side-bar-item  ${matchHistory ? "" : "item-disable"}`}>
                History
                        </div>
            </Link>
          </div>
          <div className="fill m-2 main-container">
            {props.children}
          </div>
        </div>
      </div>
    </HomeContext.Provider>)
}