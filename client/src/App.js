import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NavbarHome from './components/NavbarHome';
import HomePage from './components/HomePage';
import ChatRoom from './components/ChatRoom';


function App() {



  return <Container fluid className="pt-0 pb-3" >
    <span id="top"></span>
    <Router>
      <NavbarHome />

      <Switch>
        <Route exact path="/" >
          <HomePage />
        </Route>
        <Route exact path="/chat/:roomId">
          <ChatRoom />

        </Route>
        <Route exact path="/Sign_Up">
          <SignUp />
        </Route>

        <Route exact path="/Login">
          <Login />
        </Route>
      </Switch>
    </Router >
  </Container>
}


export default App;
