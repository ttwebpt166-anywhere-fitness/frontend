// Import Dependencies
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Header() {
  const user = useSelector((state) => state.user.data?.user);
  console.log(user);
  return (
    <header>
      <div id="logo">
        <h1 id="head">ANYTIME FITNESS</h1>
      </div>

      <nav>
        {user?.username ? (
          <NavLink to="/classes" activeClassName="active">
            Classes
          </NavLink>
        ) : (
          <>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
            <NavLink to="/auth/login" activeClassName="active">
              Login
            </NavLink>
            <NavLink to="/auth/register" activeClassName="active">
              Register
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}