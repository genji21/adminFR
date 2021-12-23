import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import userApi from "../../api/userApi";

import { useLocation, useParams, useRouteMatch } from "react-router";

import { useSelector } from "react-redux";

export default function UserList() {
  const [data, setData] = useState([]);
  const match = useRouteMatch();
 const idUserAdmin = useSelector((state) => {
   return state.user.current.user._id;
 });
  useEffect(()=>{
  const getData  = async () =>{
    const dataApi =await userApi.getAlluser("61b176f6d85a0dab9e14374e");
    console.log(dataApi.users,data);
   const newdata =  dataApi.users.map((item)=>{
      return {...item,id:item._id}
    })
    setData(newdata)
  }   
  getData()
  },[])
  const handleDelete = async (idUser) => {
    try {
      console.log(idUser);
      await userApi.DeleteUser( idUser);
      const newData = data.filter((item)=>{
        return item.id !== idUser
      })
      setData(newData)
    } catch (error) {
      alert(error);
    }
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
