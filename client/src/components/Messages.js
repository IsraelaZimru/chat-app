
const Messages = ({ msgs }) => {
    return <div>
        {!!msgs.length && msgs.map((item, i) => <p key={i} id="msg">
            <span className="font-weight-bold">{item.name}</span>
            <br></br>
            {item.data}
        </p>)}
    </div>
}

export default Messages;