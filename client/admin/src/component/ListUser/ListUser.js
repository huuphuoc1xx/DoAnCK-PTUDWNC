import Axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import config from "../../config/config.json";
import { Button, Form, Pagination } from "react-bootstrap";

const columns = [
  {
    name: "User  ID",
    selector: "id",
    minWidth: "50px",
    maxWidth: "100px",
  },
  {
    name: "Username",
    selector: "username",
  },
  {
    name: "Email",
    selector: "email",
  },
  {
    name: "Name",
    selector: "name",
  },
  {
    name: "Active",
    cell: (row) => (
      <input
        type="checkbox"
        defaultChecked={row.status === "active"}
        onClick={async (e) => {
          const res = await updateUser({
            id: row.id,
            status: e.target.checked ? "active" : "deactive",
          });
          if (res.data.code != 0)
            e.preventDefault();
        }}
      />
    ),
  },
];

const updateUser = ({ id, status }) => {
  return Axios.put(`${config.dev.path}/user`, { id, status });
};

function ListUser() {
  const [listUser, setListUser] = useState([]);
  const [lastIdStack, setLastIdStack] = useState([0]);
  const [filtData, setFiltData] = useState({});
  const [filterData, setFilterData] = useState(false);
  useEffect(() => {
    Axios.get(`${config.dev.path}/user`, {
      params: {
        ...filterData,
        last_id: lastIdStack[lastIdStack.length - 1],
      },
    }).then((res) => {
      if (res.data.code === 0) {
        setListUser(res.data.data.users);
      }
    });
  }, [lastIdStack, filterData]);

  const nextPage = () => {
    const temp = [...lastIdStack];
    if (listUser.length) temp.push(listUser[listUser.length - 1].id);
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
  };

  return (
    <div>
      <div className="d-flex">
        <div className="column-lg-4 column-md-6 column-sm-12 m-2 trans-form">
          <Form.Control
            type="text"
            placeholder="User ID"
            value={filtData.id || ""}
            onChange={(e) => {
              if (/^[0-9]*$/.test(e.target.value))
                setFiltData({ ...filtData, id: e.target.value });
            }}
          />
          <Form.Control
            type="text"
            placeholder="Name"
            value={filtData.name || ""}
            onChange={(e) => {
              setFiltData({ ...filtData, name: e.target.value });
            }}
          />
          <Form.Control
            type="text"
            placeholder="Email"
            value={filtData.email || ""}
            onChange={(e) => {
              setFiltData({ ...filtData, email: e.target.value });
            }}
          />
          <div className="d-flex justify-content-end mt-2">
            <Button variant="dark" onClick={filter}>
              Lọc
            </Button>
          </div>
        </div>
      </div>
      <DataTable data={listUser} columns={columns} striped></DataTable>
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

export default ListUser;
