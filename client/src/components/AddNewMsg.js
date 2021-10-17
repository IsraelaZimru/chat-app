import { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'


const AddNewMsg = ({ updateList, socket }) => {
    const userName = useSelector(state => state.user.name)
    const [details, setDetails] = useState({
        data: ""
    })

    const update = ({ target: { name, value } }) => {
        setDetails(prev => ({ [name]: value }))
    }

    const submitHandler = (e) => {
        e.preventDefault()

        //add and send function/data through socket!
        socket.emit('message', { name: userName, data: details.data })

        //emty the input field
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

        <Button variant="primary" type="submit" >
            Send
        </Button>
    </Form>
}

export default AddNewMsg;