import React from 'react';
import { useDispatch } from 'react-redux';
import Axios from "axios";
import config from "../config/config.json";
import { history } from '../helpers/history';
import { userConstants } from '../constans/users.contants';
import { userAction } from '../actions/users';
const { createContext, useContext, useEffect, useState } = require("react");
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = (props) => {
  
  const dispatch  = useDispatch();
  const [data, setData] = useState(false);
 
  useEffect(() => {
    Axios.get(`${config.base_path}/users/profile`).then((res) => {
      if (res.data.code === 0) {
        setData(res.data.data.user);
        
        dispatch(userAction.subcribeListuser());
        dispatch(userAction.getListUser());
      }
      else if (res.data.code === 1) history.push('/login');
      
    });
  },[]);
  if (data === false) return <></>;
  return (
    <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
