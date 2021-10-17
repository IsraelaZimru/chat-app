import React from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import { useParams } from 'react-router'
import AddNewMsg from './AddNewMsg'
import Messages from './Messages'

export default function ChatRoom({ tweets, socket, addTweet }) {
    let { roomId } = useParams()

    return (
        <div className="p-3">
            <h1 className="display-3 text-center mb-4">  {roomId} Chat Room</h1>

            <Container>
                <Row>
                    <Col md={3}>
                        <ListGroup style={{ textAlign: "center" }} >
                            <ListGroup.Item variant="dark"><strong>Participants:</strong></ListGroup.Item>
                            <ListGroup.Item variant="dark">lala</ListGroup.Item>
                            <ListGroup.Item variant="dark">rara</ListGroup.Item>
                            <ListGroup.Item variant="dark">mimi</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col>
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
