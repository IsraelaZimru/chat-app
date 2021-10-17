import React, { useState } from 'react';
import { Container, Col, Row, Card, Alert, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux'


export default function HomePage() {
    const history = useHistory()
    const userLogin = useSelector(state => state.user.isLogin)
    const [error, setError] = useState(false);


    const isConnected = (room) => {
        if (userLogin) history.push(`/chat/${room}`)
        else {
            setError(true)
            setTimeout(() => setError(false), 2000)
        }
    }

    return <Container fluid>
        <Alert show={error} variant="danger" onClose={() => setError(false)}>
            Only a user can enter the room. Please login or signUp.
        </Alert>
        <Row className="justify-content-center my-5">
            <div>
                <h1 className="display-2">Chat Rooms:</h1>
                <p className="text-center">Click on the room you want to enter</p>
            </div>
        </Row>
        <Row className="justify-content-center mb-3">
            {["News", "Sports", "Cooking", "Games", "Vehicles", "Animals"].map((room, i) => <OverlayTrigger

                key={i}
                placement="top"
                overlay={
                    <Tooltip id="tooltip-top">
                        Only a user can enter the room.
                    </Tooltip>
                }
            >
                <Card
                    bg="secondary"
                    key={i}
                    text='white'
                    style={{ width: '22rem', cursor: "pointer" }}
                    as={Col}
                    md={3}
                    className="m-3"
                    onClick={() => isConnected(room)}>
                    <Card.Body>
                        <Card.Title className="text-center">{room} </Card.Title>
                        <hr></hr>
                    </Card.Body>
                </Card>
            </OverlayTrigger>
            )}
        </Row>


    </Container>
}
