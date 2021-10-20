import { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
const moment = require('moment')


const AddNewMsg = ({ socket, roomId }) => {
    const userName = useSelector(state => state.user.name)
    const [details, setDetails] = useState({
        data: ""
    })

    const update = ({ target: { name, value } }) => {
        setDetails(prev => ({ [name]: value }))
    }

    const submitHandler = (e) => {
        e.preventDefault()

        if (details.data.length < 1) return;

        //activate and send function/data through socket to the server!
        socket.emit('chatMessage', {
            room: roomId,
            name: userName,
            data: details.data,
            time: moment().format('h:mm a'),
            seen: false
        })

        //empty the input field
        setDetails(prev => ({ "data": "" }))

    }


    return <Form onSubmit={submitHandler}>

        <Form.Group className="mb-3">
            <Form.Label>Write your message: </Form.Label>
            <Form.Control as="textarea"
                rows={3}
                value={details.data}
                onChange={update}
                onBlur={update}
                name="data"
            />
        </Form.Group>
        <div className="text-center">
            <Button variant="primary" type="submit" >
                Send
            </Button>
        </div>
    </Form>
}

export default AddNewMsg;