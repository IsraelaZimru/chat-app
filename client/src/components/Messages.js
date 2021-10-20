import { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";




const Messages = ({ msgs, socket, roomId }) => {
    const msgEndRef = useRef(null)
    const userName = useSelector(state => state.user.name);
    // const [userSeeMsg, setUserSeeMsg] = useState(false)

    useEffect(() => {
        msgEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
        , [msgs])


    // const onFocus = () => {
    //     socket.emit("msgs-seen", roomId)
    //     console.log('Tab is in focus');
    // };

    // // User has switched away from the tab (AKA tab is hidden)
    // const onBlur = () => {
    //     console.log('Tab is blurred');
    // };

    // useEffect(() => {
    //     window.addEventListener('focus', onFocus);
    //     window.addEventListener('blur', onBlur);


    //     // Specify how to clean up after this effect:
    //     return () => {
    //         window.removeEventListener('focus', onFocus);
    //         window.removeEventListener('blur', onBlur);
    //     }
    // }, []);


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
                {/* {item.seen ? "   true" : "   X"} */}
            </div>
        </div>)}
        <span ref={msgEndRef}></span>
    </div>
}

export default Messages;