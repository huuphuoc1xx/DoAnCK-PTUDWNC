import Axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "../../../../user/src/component/History/node_modules/react-data-table-component";
import config from "../../config/config.json";
import { Button, Form, Pagination } from "react-bootstrap";
import ShowDetail from "./ShowDetail";

const columns = [
  {
    name: "Game ID",
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
    name: "Winner",
    selector: "winner"
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
      `${config.dev.path}/history`, {
      params: {
        ...filterData,
        last_id: lastIdStack[lastIdStack.length - 1]
      }
    }
    ).then((res) => {
      if (res.data.code === 0) {
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

  const filter = () => {
    setFilterData(filtData);
    setLastIdStack([0]);
  }

  return (
    <div>
      <div className="d-flex">
        <div className="column-lg-4 column-md-6 column-sm-12 m-2 trans-form">
          <Form.Control
            type="text"
            placeholder="Player X"
            value={filtData.player_x || ""}
            onChange={(e) => {
              if (/^[0-9]*$/.test(e.target.value))
                setFiltData({ ...filtData, player_x: e.target.value });
            }}
          />
          <Form.Control
            type="text"
            placeholder="Player O"
            value={filtData.player_o || ""}
            onChange={(e) => {
              if (/^[0-9]*$/.test(e.target.value))
                setFiltData({ ...filtData, player_o: e.target.value });
            }}
          />
          <div className="d-flex justify-content-end mt-2">
            <Button variant="dark" onClick={filter}>Lọc</Button>
          </div>
        </div>
      </div>
      <DataTable
        data={history}
        columns={columns}
        striped
        highlightOnHover
      ></DataTable>
      <div className="d-flex justify-content-end mt-1 mr-2">
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
