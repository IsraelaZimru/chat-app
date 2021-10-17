import { useState } from 'react';
import { Form, Button } from 'react-bootstrap'


const AddNewMsg = ({ updateList, socket }) => {
    const [details, setDetails] = useState({
        name: "",
        data: ""
    })

    const update = ({ target: { name, value } }) => {
        setDetails(prev => ({ ...prev, [name]: value }))
    }

    const submitHandler = (e) => {
        e.preventDefault()

        //add and send function/data through socket!
        socket.emit('message', details)

        //emty the input field
        setDetails(prev => ({ ...prev, "data": "" }))

    }


    return <Form onSubmit={submitHandler}>

        <Form.Group className="mb-3">
            <Form.Label>name: </Form.Label>
            <Form.Control type="text"
                value={details.name}
                onChange={update}
                onBlur={update}
                name="name"
            />
        </Form.Group>

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

        <Button variant="primary" type="submit">
            Send
        </Button>
    </Form>
}

export default AddNewMsg;