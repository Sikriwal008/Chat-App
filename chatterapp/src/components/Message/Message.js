import React from 'react'
import "./Message.css"
const Message = ({ user, message }) => {
    if (user) {
        if (user === 'Admin') {
            return (
                <div className='messageBox notification'>{user}: {message}</div>
            )
        } else {
            return (
                <div className='messageBox left'>{user}: {message}</div>
            )
        }
    } else {
        return (
            <div className='messageBox right'>You: {message}</div>
        )
    }
}

export default Message