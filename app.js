var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require("path");


app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res) {
  res.sendFile(__dirname+"/public/html/index.html");
});

app.get("/ReadFile", function(req, res) {
      fs.readFile("readme.txt", function(err, data) {
        if(err) res.send("Read file error "+err);
        else res.send("<p>"+data+"</p>");
      });
});

app.get("/chats", function(req, res) {
      res.sendFile(__dirname+"/public/html/chat.html");
});

io.on('connection', function(socket){
  console.log('a user connected');

  	socket.on("chanal", function(msg){
  	   console.log(msg.id+"_dken112asdasd");
       io.emit('token',msg.id+"_dken112asdasd");
  	});

	socket.on("chat", function(chat_msg){
      var json = {
        id:chat_msg.id,
        token:chat_msg.token,
        msg:chat_msg.msg
      };
      io.emit('message', json);
	});

  	socket.on('disconnect', function(){
    console.log('user disconnected');
  	});

});

http.listen(3000, function() {
  console.log('listen port 3000');
});
