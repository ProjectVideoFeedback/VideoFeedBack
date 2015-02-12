
var socket;
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

function check(msg){
	if(msg.topic == 'buildingWatt'){
	
		end = new Date().getTime();
		time = end-start;
		start = end;
		
		console.log(msg.topic+' '+msg.payload+', time elapsed:'+time+', Date:'+new Date());
	}
}