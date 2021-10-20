import { useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";


const Messages = ({ msgs }) => {
    const msgEndRef = useRef(null)
    const userName = useSelector(state => state.user.name);

    useEffect(() => {
        msgEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
        , [msgs])


    return <div id="msgs-box">
        {!!msgs.length && msgs.map((item, i) => <div
            key={i}
            id={userName === item.name ? "youMsg" : "otherMsg"}
            className="message"
        >
            <span className="font-weight-bold">{item.name}</span>
            <small style={{ textAlign: "right" }}> {item.time}</small>{"   "}
            {userName === item.name && <FontAwesomeIcon className={item.seen ? "text-primary" : ""} icon={faCheckDouble} />}
            <div className="msgBody">
                {item.data}
            </div>
        </div>)}
        <span ref={msgEndRef}></span>
    </div>
}

export default Messages;