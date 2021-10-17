import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { io } from 'socket.io-client'
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NavbarHome from './components/NavbarHome';
import HomePage from './components/HomePage';
import ChatRoom from './components/ChatRoom';


const socket = io.connect('http://localhost:5000')

function App() {

  const [tweets, setTweets] = useState([
  ])

  useEffect(() => {
    socket.on('message', ([data]) => {
      console.log(data);
      setTweets(prev => [...prev, data])
    })
  }, [])



  const addTweet = (msg) => {
    setTweets(prev => ([...prev, msg]))
  }

  const [connected, setConnected] = useState(false)
  const [user, setUser] = useState({
    name: "",
    id: NaN,
    email: ""
  })

  return <Container fluid className="pt-0 pb-3" >
    <span id="top"></span>
    <Router>
      <NavbarHome connected={connected} user={user} />

      <Switch>
        <Route exact path="/" >
          <HomePage />
        </Route>
        <Route exact path="/chat/:roomId">
          <ChatRoom tweets={tweets} socket={socket} addTweet={addTweet} />

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
