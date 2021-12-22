import React, { useEffect, useLayoutEffect, useState } from "react";
import { Route, Redirect, useRouteMatch, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import { memo } from "react";

const PrivateRoute = ({
  component: Component,
  path,
  waitingForAuth: Waiting,
}) => {
  const isLog = useSelector((state) => state.user.isLog);
  const isAdmin = useSelector((state)=> state.user.isAdmin)
  useEffect(() => {
    
  }, [isAdmin]);
  return (
    <Route
      path={path}
      render={(props) => {
        return (
            <>
              {isAdmin  ? (
                <>
                  <Topbar />
                  <div className="container">
                    <Sidebar />
                    <Component {...props} />
                  </div>
                </>
              ) : (
                
                 <Redirect to="/login" />
              )}
            </>
          )
              
      }}
    />
  );
};
export default memo(PrivateRoute);
