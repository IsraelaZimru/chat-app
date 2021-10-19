import { useEffect } from "react";

const Messages = ({ msgs }) => {


    return <div>
        {!!msgs.length && msgs.map((item, i) => <p key={i} id="msg">
            <span className="font-weight-bold">{item.name}</span>
            <small style={{ textAlign: "right" }}> {item.time}</small>
            <br></br>
            {item.data}
            <br></br>
        </p>)}
    </div>
}

export default Messages;