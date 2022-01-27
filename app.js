const http = require("http");

const express = require("express");
const { Server } = require("socket.io");
const { links } = require("express/lib/response");

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

const users = {};

io.on("connection", (socket) => {

    // Listening

    socket.on("login", nickname => {
        console.log(`${nickname} connected.`);
        users[socket.id] = nickname;
        io.sockets.emit("online", users);
    })

    socket.on("disconnect", () => {
        console.log(`User disconnected. ${socket.id}`);
        delete users[socket.id];
        io.sockets.emit("online", users);
    });

    socket.on("chat message", (data) => {
        console.log(data);
        io.sockets.emit("chat message", data);
    });
    socket.on("isTyping", (data) => {
        socket.broadcast.emit("isTyping", data);
    });
    socket.on("pvChat", (data) => {
        console.log(`private chat adata: ${data}`);
        console.log(data.to);
        io.to(data.to).emit("pvChat", data);
    })
});
