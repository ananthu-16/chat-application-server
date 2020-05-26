//requiring necessary modules for the backend

const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router.js")
const { addUser, removeUser, getUser, getUsersInRoom } = require("./userFunction");

const port = 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

//waiting for connection from a particular socket
io.on("connection", (socket) => {
  console.log("user has joined");
  //waiting for joining connection and in callback function adding the user to array
  socket.on("join",({name, room}, callback ) => {
    var id = socket.id;
    const data = addUser({id, name, room});
    if(data.error){
      return callback && callback(data);
    }
    //admin generated messages...
    socket.emit('message',{user: 'admin', text: `Hey ${data.name}, welcome to the ${data.room} :) `});
    socket.broadcast.to(data.room).emit('message',{ user: 'admin', text: `${data.name} has joined ${data.room}`});
    socket.join(data.room);
    callback && callback(data);
  });

  // waiting for send messages from particular socket
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    //sending this message from particular socket to all other users in the same room
    io.to(user.room).emit('message', {user: user.name, text: message});
    callback();
  });

  //disconnecting socket
  socket.on("disconnect", (callback) => {
    console.log("user left");
    const user = removeUser(socket.id);
  });
});

server.listen(port,() => {
  console.log("server has started");
})
