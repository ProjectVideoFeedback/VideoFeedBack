var kwhTotal;


function setDaily(msg) {
	if(msg.topic == 'VideoFeedbackDaily') {
		var payload = msg.payload;
		console.log("Topic: " + msg.topic + " Payload: " + payload);
		console.log("total: " + payload.accumulated);
		$('#kwh-today').html(payload.accumulated + " kWh");
	}
}
