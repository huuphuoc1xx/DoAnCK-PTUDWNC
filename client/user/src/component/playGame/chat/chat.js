import { Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import Item from './item';
import "./chat.css";
import { useDispatch, useSelector } from "react-redux";
import { PLAYGAMECONTANTS } from "../../../constans/playGame.contants";
import { ACTIONSOCKET } from "../../../constans/socket.contants";

function Chat(props) {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  console.log("LISST_MESS", props.listMessage);
  const sendMessage = () => {
    setMessage('');
    dispatch({type : ACTIONSOCKET.EMIT, event: PLAYGAMECONTANTS.SEND_MESSAGE, data: message});
  }
  return (
    <div className="chat-container">
      <div className="col-10 chat">
        {props.listMessage.map(message => <Item username = {message.username} mess = {message.mess}></Item>)}
      </div>
      <div className="chat-view">
        <Form.Control
          as="textarea"
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="chat-input"
        ></Form.Control>
        <Button onClick ={sendMessage} className="send-btn">Send</Button>
      </div>
    </div>
  );
}

export default Chat;
