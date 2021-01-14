import Axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import config from "../../config/config.json";
import { Button, Form, Pagination } from "react-bootstrap";
import ShowDetail from "./ShowDetail";
import Nav from "../Nav";
const columns = [
  {
    name: "ID",
    selector: "id",
    minWidth: "50px",
    maxWidth: "100px",
  },
  {
    name: "X Player",
    selector: "player_x",
  },
  {
    name: "O Player",
    selector: "player_o"
  },
  {
    name: "Result",
    selector: "result"
  },
  {
    name: "Detail",
    cell: row => <ShowDetail info={row}/>
  }
];

function History() {
  const [history, setHistory] = useState([]);
  const [lastIdStack, setLastIdStack] = useState([0]);
  const [filtData, setFiltData] = useState({});
  const [filterData, setFilterData] = useState(false);
  useEffect(() => {
    Axios.get(
      `${config.base_path}/history`, {
      params: {
        ...filterData,
        last_id: lastIdStack[lastIdStack.length - 1]
      }
    }
    ).then((res) => {
      if (res.data.code === 0) {
        console.log("LICH_SU", res.data.data.games);
        setHistory(res.data.data.games);
      }
    });
  }, [lastIdStack, filterData]);

  const nextPage = () => {
    const temp = [...lastIdStack];
    if (history.length)
      temp.push(history[history.length - 1].id);
    setLastIdStack(temp);
  };

  const previousPage = () => {
    const temp = [...lastIdStack];
    temp.pop();
    setLastIdStack(temp);
  };

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
          <Pagination.Prev onClick={previousPage} />
          <Pagination.Next onClick={nextPage} />
        </Pagination>
      </div>
    </div>
  );
}

export default History;
