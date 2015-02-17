
var socket;
var measurement_data = [];
var start, end, time;

function connect(source){
	console.log("Tjena boys");
	start = new Date().getTime();
	socket = io.connect(source);
	socket.on('connect', function () {
	    socket.on('mqtt', function (msg) {
			check(msg);
	    });
	});
	socket.emit('subscribe',{topic:'/some/sensor/data'});
}

function measurement_storage(msg, date){

	measurement_data.push(
		{"measurement":[{"buildingwatt": msg.payload, "date": date}]}
		);
}

function check(msg){
	if(msg.topic == 'buildingWatt'){
	
		end = new Date().getTime();
		time = end-start;
		start = end;
		measurement_storage(msg, new Date());
		console.log(msg.topic+' '+msg.payload+', time elapsed:'+time+', Date:'+new Date());
		console.log("size: " + measurement_data.length);
	}
}
