import React, { useState, useEffect } from 'react';
import clientLoginForm from './components/clientLoginForm';
import clientRegisterForm from './components/clientRegisterForm';
// import instructorLoginForm from "./components/instructorLoginForm";
// import instructorRegisterForm from "./components/instructorRegisterForm";
import { Container } from 'react-bootstrap';
import { axiosWithAuth } from './utilities/axiosWithAuth';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './actions';
import { Route, useHistory } from 'react-router-dom';
import LandingPage from './view/LandingPage';
import NavbarView from './components/Navbar';

function App() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(dispatch);
  }, [dispatch]);

  const submitUser = (user) => {
    axiosWithAuth
      .get('/', user)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <NavbarView />
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route path="/login">
        <h2>Login</h2>
      </Route>
      <Route path="/register" component={clientRegisterForm} />
    </>
  );
}

export default App;
