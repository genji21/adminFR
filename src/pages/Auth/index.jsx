import React from 'react';
import PropTypes from 'prop-types';
import "./main.css";
import banner from '../../image/banner.jpg'
import { useState } from 'react';
import { getinforUser, login, register } from "../../slice/userSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { Redirect, useHistory } from "react-router";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useMemo } from 'react';

AuthPage.propTypes = {
    
};

function AuthPage(props) {
  const dispath = useDispatch();
  const history = useHistory();
  const isAdmin = useSelector((state) => state.user.isAdmin);
useMemo(()=>{

},[])
    const [valueName,setValueName] = useState({
        "name":"",
        "pass":""
    })
    const handlesubmit = async (e, values) => {
        e.preventDefault()
        try {
         const value = {"email":valueName.name,"password":valueName.pass}   
       const action = login(value);
       const resultAction = await dispath(action);
       const data = unwrapResult(resultAction);
        history.push({ pathname: "/" });

     } catch (error) {
       
     }
    };
    const handleChangeInput = (e) =>{
         const value = e.target.value;
         console.log([e.target.name],valueName[e.target.name])
        setValueName({ ...valueName, [e.target.name]: value });
    }
    useEffect(() => {
      console.log(isAdmin);
      if (isAdmin) {
          history.push({pathname:"/"})
       console.log("change ")
      }
    }, [isAdmin]);
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form className="login100-form validate-form" onSubmit={handlesubmit}>
              <span className="login100-form-title p-b-43">Login to continue</span>

              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  value={valueName.name}
                  className="input100"
                  type="text"
                  name="name"
                  onChange={handleChangeInput}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Email</span>
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <input
                  value={valueName.pass}
                  className="input100"
                  type="password"
                  name="pass"
                  onChange={handleChangeInput}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Password</span>
              </div>

              <div className="flex-sb-m w-full p-t-3 p-b-32">
                <div className="contact100-form-checkbox">
                  <input
                    className="input-checkbox100"
                    id="ckb1"
                    type="checkbox"
                    name="remember-me"
                  />
                  <label className="label-checkbox100" htmlFor="ckb1">
                    Remember me
                  </label>
                </div>

                <div>
                  <a href="#" className="txt1">
                    Forgot Password?
                  </a>
                </div>
              </div>

              <div className="container-login100-form-btn">
                <button className="login100-form-btn">Login</button>
              </div>

              <div className="text-center p-t-46 p-b-20">
                <span className="txt2">or sign up using</span>
              </div>

              <div className="login100-form-social flex-c-m">
                <a
                  href="#"
                  className="login100-form-social-item flex-c-m bg1 m-r-5"
                >
                  <i className="fa fa-facebook-f" aria-hidden="true"></i>
                </a>

                <a
                  href="#"
                  className="login100-form-social-item flex-c-m bg2 m-r-5"
                >
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
              </div>
            </form>

            <div
              className="login100-more"
              style={{ backgroundImage: `url(${banner})` }}
            ></div>
          </div>
        </div>
      </div>
    );
}

export default AuthPage;