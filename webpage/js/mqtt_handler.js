var kwhTotal;


function setDaily(msg) {
	if(msg.topic == 'VideoFeedbackDaily') {
		var payload = msg.payload;
		console.log("Topic: " + msg.topic + " Payload: " + payload);
		kwhTotal = payload.accumulated;
		console.log("total: " + total);
		$('#kwh-today').html(total + " kwh");
	}
}
