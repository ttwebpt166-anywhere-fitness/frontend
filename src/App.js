import React, { useState } from 'react';
import clientLoginForm from './components/clientLoginForm';
import clientRegisterForm from './components/clientRegisterForm';
import instructorLoginForm from './components/instructorLoginForm';
import instructorRegisterForm from './components/instructorRegisterForm';
import { Container, Button } from 'reactstrap';
import axios from 'axios';
import './App.css';


function App() {
  const [post, setPost] = useState([])

  const submitUser = (user) => {
    axios
      .post('https://anywhere-fitness-server.herokuapp.com/v1/', user)
      .then((response) => {
        setPost(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Container className='App'>
      <h1>Anytime Fitness</h1>
      <div className='Members'>
        <h2>Members</h2>
        <Button a href={clientRegisterForm}>Create an Account</Button>
        <Button a href={clientLoginForm}>Login</Button>
      </div>
      <div className='Instructors'>
        <h2>Instructors</h2>
        <Button a href={instructorRegisterForm}>Set Up an Account</Button>
        <Button a href={instructorLoginForm}>Login</Button>
      </div>
    </Container>
  )
}

export default App;
