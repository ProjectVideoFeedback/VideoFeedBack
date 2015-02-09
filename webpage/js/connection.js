
var socket;

function connect(){
	socket = io.connect('http://op-en.se:5000');
	socket.on('connect', function () {
	    socket.on('mqtt', function (msg) {
	      console.log(msg.topic+' '+msg.payload);
	    });

	});
	hej.arguments.arguments.hej.payload();

}
