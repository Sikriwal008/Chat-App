import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { user } from "../Join/Join"
import socketIo from "socket.io-client"
import sent from "../../Images/sendButton.png"
import logo from "../../Images/logo.png"
import Message from "../Message/Message.js"
import ReactScrollToBottom from "react-scroll-to-bottom"

const ENDPOINT = "http://localhost:4500/"

const Chat = () => {
    const socket = socketIo(ENDPOINT, { transport: ['websocket'] })
    const [id, setid] = useState("")
    const [messages, setmessages] = useState([])
    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = "";
    }
    useEffect(() => {
        socket.on('connect', () => {
            setid(socket.id);
        })
        socket.emit('joined', { user })
        socket.on('welcome', (data) => {
            setmessages([...messages, data])
            console.log(data.user, data.message)
        })
        return () => {
            socket.off();
        }
    }, [])
    socket.on('userJoined', (data) => {
        setmessages([...messages, data])
        console.log(data.user, data.message)
    })
    socket.on('leave', (data) => {
        setmessages([...messages, data])
        console.log(data.user, data.message)
    })
    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setmessages([...messages, data])
            console.log(data.user, data.message, data.id);
        })
        return () => {
            socket.off();
        }
    }, [messages])

    return (
        <div className='chatPage'>
            <div className="chatContainer">
                <div className="header">
                    <img src={logo} alt="Logo" />
                </div>
                <ReactScrollToBottom className='chatBox'>
                    {messages.map((item, i) => { return <Message key={i} user={item.id === id ? '' : item.user} message={item.message} /> })}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input type="text" id="chatInput" />
                    <button onClick={send} className="sendBtn"><img src={sent} alt="" /></button>
                </div>
            </div>

        </div>
    )
}

export default Chat