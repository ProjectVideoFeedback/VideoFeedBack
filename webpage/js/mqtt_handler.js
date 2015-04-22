var daily;
var monthly;
var price = 1.3;

function setDaily(msg) {
	if (msg.topic == 'VideoFeedbackDailyMonthly') {
		var payload = msg.payload.split(/,|:/);
		if (daily != payload[5].replace(/"/g,'')) {
			daily = payload[5].replace(/"/g,'');
			monthly = payload[7].replace(/"/g,'');
			console.log("Topic: " + msg.topic + " Payload: " + msg.payload);
			updateStats();
		}
	}
}

function getDailyCost() {
	return Math.floor(daily * price);
}

/* Update stats (power consumption) based on price per kWh */
function updateStats() {
	price = parseFloat($('#price').val().replace(/,/g,'.'));
	if (price === undefined)
		price = 1.3;

	/* If price is changed, jump to the right time */
	if (timestamps[getDailyCost()] !== undefined)
		video.currentTime = timestamps[getDailyCost()];

	$('#kwh-today').html(daily + " kWh");
	$('#money-today').html((daily*price).toFixed(2) + " kr");

	$('#kwh-month').html(monthly + " kWh");
	$('#money-month').html((monthly*price).toFixed(2) + " kr");
}
