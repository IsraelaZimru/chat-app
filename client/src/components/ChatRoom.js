import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import AddNewMsg from './AddNewMsg'
import Messages from './Messages'
import { io } from 'socket.io-client'

const socket = io.connect('http://localhost:5000');


export default function ChatRoom() {
    let { roomId } = useParams()
    const history = useHistory()
    const connected = useSelector(state => state.user.isLogin)
    const [tweets, setTweets] = useState([])


    useEffect(() => {
        if (!connected) {
            return history.push("/")
        }
    }, [connected])


    useEffect(() => {

        socket.on('message', ([data]) => {
            console.log(data);
            setTweets(prev => [...prev, data])
        })
    }, [])


    const addTweet = (msg) => {
        setTweets(prev => ([...prev, msg]))
    }


    return (
        <div className="p-3">

            <Container >
                <Row>
                    <Col md={3} className="mt-5">
                        <ListGroup style={{ textAlign: "center" }} >
                            <ListGroup.Item variant="dark"><strong>Participants:</strong></ListGroup.Item>
                            <ListGroup.Item variant="dark">lala</ListGroup.Item>
                            <ListGroup.Item variant="dark">rara</ListGroup.Item>
                            <ListGroup.Item variant="dark">mimi</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col>
                        <h1 className="display-3 text-center mb-4">  {roomId} Chat Room</h1>
                        <section className="borders">
                            <Container id="forum">
                                <Row className="justify-content-md-center">
                                    <Col md="auto">
                                        <h1> Group Chat</h1>
                                    </Col>
                                </Row>

                                <Row className="p-3">
                                    <Col md={5}>
                                        <Messages msgs={tweets} socket={socket} />
                                    </Col>
                                </Row>
                            </Container>
                        </section>

                        <section className="borders">
                            <Container id="add-msg">
                                <Row className="p-3">
                                    <Col>
                                        <AddNewMsg updateList={addTweet} socket={socket} />
                                    </Col>
                                </Row>
                            </Container>
                        </section>
                    </Col>
                </Row>
            </Container>


        </div>

    )
}
