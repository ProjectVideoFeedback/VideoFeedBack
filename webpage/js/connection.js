
var socket;

function connect(source){
	console.log("Tjena boys");
	socket = io.connect(source);
	socket.on('connect', function () {
	    socket.on('mqtt', function (msg) {
			check(msg);
	    });
	});
	socket.emit('subscribe',{topic:'/some/sensor/data'});
}

function check(msg){
	if(msg.topic == 'buildingWatt')
		console.log(msg.topic+' '+msg.payload);
}