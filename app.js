const express = require('express');
const app = express();
const http = require("http");
const path = require('path');
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

// Fix: Set up the correct way to serve static files
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

io.on("connection", function(socket) {
    socket.on("send-location",function(data){
        io.emit("receive-location",{id:socket.id,...data});
    })
    console.log("Client connected");
});

app.get('/', function(req, res) {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
