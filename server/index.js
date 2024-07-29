const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const port = 4500 || process.env.PORT;
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
const users = [{}];

app.use(cors());

app.get("/", (req, res) => {
    res.send("Its Working");
})
io.on("connection", (socket) => {
    socket.on('joined', ({ user }) => {
        users[socket.id] = user;
        console.log(user + " has joined.");
        socket.broadcast.emit('userJoined', { user: "Admin", message: users[socket.id] + " has joined" })
        socket.emit('welcome', { user: 'Admin', message: 'Welcome to the chat ' + users[socket.id] })
    })
    socket.on('disconnect', () => {
        if (users[socket.id]) {
            console.log(users[socket.id] + " has left");
            socket.broadcast.emit('leave', { user: "Admin", message: users[socket.id] + " has left" });
            delete users[socket.id];
        }
    });
    socket.on('message', ({ message, id }) => {
        io.emit('sendMessage', { user: users[id], message, id })
    })
})
server.listen(port, () => {
    console.log('Server is working on http://localhost:' + port)
})