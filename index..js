const express = require('express');
const app  = express();
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
//Socketio BoilerPlate

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

io.on("connection" ,function(socket){
    console.log("Connected to server");
    socket.on("send-location",function(data){
        io.emit("receive-location",{id:socket.id,...data});
        // console.log("Received location:", data);
    });
    socket.on("disconnect",function(){
       io.emit("user-disconnected" , socket.id); 
    //    console.log("User disconnected:", id)
    })
});

app.get("/", function(req,res){
    res.render("index.ejs");
});

server.listen(5080);