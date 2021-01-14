import Axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import config from "../../config/config.json";
import { Button, Form, Pagination } from "react-bootstrap";
import Nav from "../Nav";
const columns = [
  {
    name: "Username",
    selector: "username",
    minWidth: "50px",
    maxWidth: "100px",
  },
  {
    name: "Email",
    selector: "email",
  },
  {
    name: "Cup",
    selector: "cup"
  },
];

function Rank() {
  const [history, setHistory] = useState([]);
  const [lastIdStack, setLastIdStack] = useState([0]);
  useEffect(() => {
    Axios.get(
      `${config.base_path}/rank`, {
    }
    ).then((res) => {
      if (res.data.code === 0) {
        console.log("LICH_SU", res.data.data);
        setHistory(res.data.data.user);
      }
    });
  }, []);

  return (
    <div>
        <Nav/>
      <div className="d-flex" style={{"marginLeft":"10px"}}>
        <div className="column-lg-4 column-md-6 column-sm-12 m-2 trans-form">
       </div>
      </div>
      <DataTable
        data={history}
        columns={columns}
        striped
        highlightOnHover
      ></DataTable>
      <div className="d-flex justify-content-end mt-1 mr-2" style={{"marginLeft":"10px"}}>
        <Pagination>
          <Pagination.First onClick={() => setLastIdStack([0])} />
        </Pagination>
      </div>
    </div>
  );
}

export default Rank;
