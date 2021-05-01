import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./tscomponents/Login";
import Register from "./tscomponents/Register";
import Homepage from "./tscomponents/Homepage";
import Header from "./tscomponents/Header";
import Classes from "./tscomponents/Classes";
import AddClass from "./tscomponents/AddClass";
import EditListing from "./tscomponents/EditClass";

import PrivateRoute from "./utilities/PrivateRoute";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        {/* Will turn on private route after we have access to token. */}
        <PrivateRoute exact path="/classes" component={Classes} />
        <Route exact path="/">
          <Homepage />
        </Route>

        <Route path="/addClass">
          <AddClass />
        </Route>

        <Route path="/editClass/:id">
          <EditListing />
        </Route>

        <Route path="/auth/login">
          <Login />
        </Route>

        <Route path="/auth/register">
          <Register />
        </Route>
      </div>
    </Router>
  );
}

export default App;
