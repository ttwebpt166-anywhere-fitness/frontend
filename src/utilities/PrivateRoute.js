import React from "react";
import { Route, Redirect } from "react-router-dom";

const isUserAutheticated = () => {
  return localStorage.getItem("token") !== null;
};

const PrivateRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={() => {
        if (isUserAutheticated()) {
          return <Component />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
