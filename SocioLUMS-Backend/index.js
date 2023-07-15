const express = require('express');
const port = 3000;
const chat_port = 3001;
const app = express();
const bodyParser = require('body-parser');
require('./db');
require('./models/Student');
require('./models/Society');
require('./models/Sponsor');
require('./models/Message');
const Auth_routes = require('./routes/Auth_routes');
const Uploadmediaroutes = require('./routes/Uploadmediaroutes')
const Msg_routes = require('./routes/msg_routes');
const { createServer } = require('http');
const {Server} = require('socket.io');
const http_server = createServer();
const io = new Server(http_server, {});

io.on('connection', (socket) => {
    console.log('a user connected: ', socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected: ', socket.id);
    })
    // socket.on('chat message', (msg) => {
    //     console.log('message: ' + msg);
    //     io.emit('chat message', msg);
    // })
    socket.on('join_room', (data) => {
        console.log("user ", socket.id , "joined room: ", data.roomid);
        socket.join(data);
    })
    socket.on("send_message", (data) => {
        console.log("message: ", data);
        io.to(data.roomid).emit("receive_message", data);
    })
});

http_server.listen(chat_port, () => {
    console.log("chat server is running on port: " + chat_port);
})
//app.use(bodyParser.json);
app.use(express.json());
app.use(Auth_routes);
app.use(Uploadmediaroutes);
app.use(Msg_routes);
app.listen(port, () => {
    console.log("server is running on port: " + port);
})
