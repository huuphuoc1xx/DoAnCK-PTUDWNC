import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import config from "../../config/config.json";
import NavHome from "../nav";
import ItemUser from './itemUser';
import './listUser.css'
import { Table } from 'react-bootstrap';
function ListUser() {
    const [listUser, setListUser] = useState([]);
    const [iLoaded, setIsLoaded] = useState('false');
    useEffect(() => {
        Axios.get(`${config.base_path}`).then(res => {
            setIsLoaded(true);
            setListUser(res.data.data.listUser);
        })
    }, []);
    return (
        <NavHome>
            <div className="containerE">
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUser.map((item) => {
                            <ItemUser user = {item}></ItemUser>
                           
                        })}
                    </tbody>
                </Table>
            </div>
        </NavHome>
    )

}

export default ListUser;