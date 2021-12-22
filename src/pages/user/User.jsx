import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./user.css";
import { useLocation, useParams,useRouteMatch } from "react-router";
import userApi from "../../api/userApi";
import { useSelector } from "react-redux";
export default function User() {
  const [data,setData] = useState('')
  const [dataValue,setDataValue ] = useState({
    name:"",
    email:"",
    phone:"",
    address:""
  })
  const idUserAdmin = useSelector((state)=>{
    return state.user.current.user._id
  })
  const match =useRouteMatch()
  const handleChangeInput = (e) =>{
    setDataValue({...dataValue,[e.target.name] : e.target.value})
  }
  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
        await userApi.updateUser(idUserAdmin,match.params.userId,{data:dataValue});
        if(dataValue.name === '' || dataValue.email === '' || dataValue.phone === '') return alert ("Sai Thong Tin0")
       return alert("Update Successfully")
    } catch (error) {
      
    }
}
  useEffect(()=>{
  const getData = async () =>{
  const dataApi = await userApi.getUser(idUserAdmin, match.params.userId);
  setData(dataApi)
}

getData()
  },[])
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{data.user?.name}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{data.user?.name}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{data.user?.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{data.user?.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">
                {data.user?.status === "Pending"
                  ? "Chưa Kích Hoạt"
                  : "Đã Kích Hoạt"}
              </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  name="name"
                  onChange={handleChangeInput}
                  type="text"
                  placeholder={data.user?.name}
                  className="userUpdateInput"
                  value={dataValue.name}
                />
              </div>

              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={data.user?.email}
                  className="userUpdateInput"
                  value={dataValue.email}
                  name="email"
                  onChange={handleChangeInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder={data.user?.phone}
                  className="userUpdateInput"
                  value={dataValue.phone}
                  name="phone"
                  onChange={handleChangeInput}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              {/* <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div> */}
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
