
var socket;
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);




app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('chat message', function(msg){
    	io.emit('chat message', msg);
		console.log(msg);
  	});
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});

function connect(){
	socket = io.connect('http://op-en.se:5000');
	socket.on('connect', function () {
	    socket.on('mqtt', function (msg) {
	      console.log(msg.topic+' '+msg.payload);
	    });
	    socket.emit('subscribe',{topic:'/some/sensor/data'});
	}); 
}