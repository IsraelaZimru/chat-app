import React from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';
import { useHistory } from 'react-router';


export default function HomePage() {
    const history = useHistory()
    return <Container fluid>
        <Row className="justify-content-center my-5">
            <div>
                <h1 className="display-2">Chat Rooms:</h1>
                <p className="text-center">Click on the room you want to enter</p>
            </div>
        </Row>
        <Row className="justify-content-center mb-3">
            {["News", "Sports", "Cooking", "Games", "Vehicles", "Animals"].map((room, i) => <Card
                bg="secondary"
                key={i}
                text='white'
                style={{ width: '22rem', cursor: "pointer" }}
                as={Col}
                md={3}
                className="m-3"
                onClick={() => history.push(`/chat/${room}`)}>
                <Card.Body>
                    <Card.Title className="text-center">{room} </Card.Title>
                    <hr></hr>
                </Card.Body>
            </Card>)}
        </Row>


    </Container>
}
