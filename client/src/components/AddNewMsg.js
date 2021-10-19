import { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'


const AddNewMsg = ({ socket }) => {
    const userName = useSelector(state => state.user.name)
    const [details, setDetails] = useState({
        data: ""
    })

    const update = ({ target: { name, value } }) => {
        setDetails(prev => ({ [name]: value }))
    }

    const submitHandler = (e) => {
        e.preventDefault()

        //activate and send function/data through socket to the server!
        // socket.emit('message', {
        socket.emit('chatMessage', {
            name: userName,
            data: details.data,
            time: new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes()
        })

        //empty the input field
        setDetails(prev => ({ "data": "" }))


        //scroll to the end
        // bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
        // bottomRef.current.scrollTop = bottomRef.current.scrollHeight - bottomRef.current.clientHeight;

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