import React, { useEffect, useRef, useState } from 'react'
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router'
import { useSelector } from 'react-redux';
import AddNewMsg from './AddNewMsg'
import Messages from './Messages'
import { getRoomData } from '../../DAL/api';
import { socket } from '../../socket/socket'


export default function ChatRoom() {
    let { roomId } = useParams()
    const history = useHistory()
    const user = useSelector(state => state.user)
    const [chat, setChat] = useState({
        name: "",
        msg: [],
        users: []
    })

    useEffect(() => {
        //Join chatroom
        socket.emit('joinRoom', { sender: user.name, senderId: user.id, roomId })
        return () => {
            socket.off('joinRoom', { sender: user.name, senderId: user.id, roomId });
        };
    }, [])


    useEffect(() => {
        if (!user.isLogin) {
            return history.push("/")
        }
    }, [user.isLogin])


    useEffect(() => {
        const roomInfo = async (id) => {
            try {
                const response = await getRoomData(id)
                setChat(prev => response)
            } catch (err) {
                console.log(err);
                alert("error", err)
            }
        }

        roomInfo(roomId)

        //Listning to new msg and reciving it:
        socket.on('message', ([data]) => {
            setChat(prev => ({ ...prev, "msg": [...prev.msg, data] }))
        })

        socket.on('roomUsers', async ({ users }) => {
            await setChat(prev => ({ ...prev, "users": users }))
            console.log("users", users);
        })
    }, [])



    const leaveRoom = () => {
        history.push('/')
        history.go(0)
    }


    const onFocus = () => {
        socket.emit("msgs-seen", roomId)
        console.log('Tab is in focus');
        socket.on("get-seen-Msgs", async (msgs) => {
            await setChat(prev => ({ ...prev, "msg": msgs }))

            console.log("temp", msgs);
        })
    };

    // User has switched away from the tab (AKA tab is hidden)
    const onBlur = () => {
        console.log('Tab is blurred');
    };

    useEffect(() => {
        window.addEventListener('focus', onFocus);
        window.addEventListener('blur', onBlur);


        // Specify how to clean up after this effect:
        return () => {
            window.removeEventListener('focus', onFocus);
            window.removeEventListener('blur', onBlur);
        }
    }, []);



    return (
        <div className="p-3">

            <Container >
                <Row>
                    <Col md={3} className="mt-5">
                        <ListGroup style={{ textAlign: "center" }} >
                            <ListGroup.Item variant="dark"><strong>Participants:</strong></ListGroup.Item>

                            {!!chat.users.length && chat.users.map((user, i) => <ListGroup.Item
                                variant="dark" key={i}>{user.name}</ListGroup.Item>)
                            }

                        </ListGroup>

                        <div className="m-3 text-center">
                            <Button variant="warning" size="lg" onClick={leaveRoom}>
                                Leave Chat
                            </Button>
                        </div>
                    </Col>
                    <Col>
                        <h1 className="display-3 text-center mb-4">  {chat.name} Chat Room</h1>
                        <section className="borders">
                            <Container id="forum" S>
                                <Row className="justify-content-md-center">
                                    <Col md="auto">
                                        <h1> Group Chat</h1>
                                    </Col>
                                </Row>

                                <Row className="p-3" id="fixHight">
                                    <Col md={5}>
                                        <Messages msgs={chat.msg} socket={socket} roomId={roomId} />
                                    </Col>
                                </Row>
                            </Container>
                        </section>

                        <section className="borders">
                            <Container id="add-msg">
                                <Row className="p-3">
                                    <Col>
                                        <AddNewMsg socket={socket} roomId={roomId} />
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
