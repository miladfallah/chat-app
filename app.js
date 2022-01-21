const http = require("http");

const express = require("express");
const { Server } = require("socket.io");

const app = express(); //? Request Handler Valid createServer()
const server = http.createServer(app);
const io = new Server(server);

// Static folder
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Setup websocket

io.on("connection", (socket) => {

    // Listening

    socket.on("login", data => {
        console.log(`${data} connected.`);
    })

    socket.on("disconnect", () => {
        console.log(`User disconnected. ${socket.id}`);
    });

    socket.on("chat message", (data) => {
        console.log(data);
        io.sockets.emit("chat message", data);
    });
    socket.on("isTyping", (data) => {
        socket.broadcast.emit("isTyping", data);
    });
});
