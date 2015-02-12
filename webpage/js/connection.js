
var socket;
var measurement_data = [];

function connect(source){
	console.log("Tjena boys");
	socket = io.connect(source);
	socket.on('connect', function () {
	    socket.on('mqtt', function (msg) {
	      console.log(msg.topic+' '+msg.payload);
	    });
	});
	socket.emit('subscribe',{topic:'/some/sensor/data'});
}

function measurement_storage(msg, date){

	measurement_data.push(
		{"measurement":[{"buildingwatt": msg.payload, "date": date }]}
		);
}

