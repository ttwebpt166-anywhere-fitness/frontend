import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./tscomponents/Login";
import Register from "./tscomponents/Register";
import Homepage from "./tscomponents/Homepage";
import Header from "./tscomponents/Header";
import Classes from "./tscomponents/Classes";
import AddClass from "./tscomponents/AddClass";
import EditClass from "./tscomponents/EditClass";

import PrivateRoute from "./utilities/PrivateRoute";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

       
       
          <PrivateRoute exact path="/classes" component={Classes} />
          <Route exact path="/">
            <Homepage />
          </Route>

          {/* <Route path="/classes">
              <Classes />
            </Route> */}

          <Route path="/addClass">
            <AddClass />
          </Route>

          <Route path="/editClass/:id">
            <EditClass />
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
