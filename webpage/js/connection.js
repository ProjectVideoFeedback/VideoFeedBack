
var socket;
var measurement_data = [];
var start, end, time;
var startTime = new Date();
var wattSum = 0;
var totalCost = 0;
var connected = false;

/* Connect and subscribe to a host */
function connect(source) {
	start = new Date().getTime();
	socket = io.connect(source);
	socket.on('connect', function() {
	    socket.on('mqtt', function(msg) {
			check(msg);
			setDaily(msg);
			/* ------------------------- <REAL> ------------------------- */
			/* Jump to time in video where amount of coins is the same as the current cost */

			if (connected === false) {
				coins = getDailyCost();
				if (!isNaN(coins)) {
					connected = true;
					if (timestamps[getDailyCost()] !== undefined)
						video.currentTime = timestamps[coins];
				}
			}
			
			/* ------------------------- </REAL> ------------------------- */
	    });
	});
	socket.emit('subscribe', { topic:'/some/sensor/data' });
}

function check(msg) {
	if (msg.topic == 'buildingWatt') {
		end = new Date().getTime();
		time = end - start;
		start = end;
		wattSum += msg.payload;
	}
}
