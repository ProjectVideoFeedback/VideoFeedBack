
var socket;
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);



function connect(){
	socket = io.connect('http://op-en.se:5000');
	socket.on('connect', function () {
	    socket.on('mqtt', function (msg) {
	      console.log(msg.topic+' '+msg.payload);
	    });
	    
	}); 
}