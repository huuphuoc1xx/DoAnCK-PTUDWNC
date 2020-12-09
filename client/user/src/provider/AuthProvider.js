import Axios from "axios";
import config from "../config/config.json";

const { createContext, useContext, useEffect, useState } = require("react");

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = (props) => {
  const [data, setData] = useState(false);
  useEffect(() => {
    Axios.get(`${config.base_path}/users/profile`).then((res) => {
      if (res.data.code === 0) setData(res.data.data.user);
      else if (res.data.code === 1) window.location.href = "/login";
    });
  },[]);
  if (data === false) return <></>;
  return (
    <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
