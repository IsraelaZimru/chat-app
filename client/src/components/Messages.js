import { useEffect, useRef } from "react";

const Messages = ({ msgs }) => {
    const msgEndRef = useRef(null)

    useEffect(() => {
        msgEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
        , [msgs])

    return <div>
        {!!msgs.length && msgs.map((item, i) => <p key={i} id="msg">
            <span className="font-weight-bold">{item.name}</span>
            <small style={{ textAlign: "right" }}> {item.time}</small>
            <br></br>
            {item.data}
            <br></br>
        </p>)}
        <span ref={msgEndRef}></span>
    </div>
}

export default Messages;