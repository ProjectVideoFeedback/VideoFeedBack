var kwhTotal;


function getDaily(msg) {
	if(msg.topic == 'VideoFeedbackDaily')
	{
		var payload = msg.payload;
		console.log("Topic: " + msg.topic + " Payload: " + payload);
		if(kwhTotal === undefined)
		{
			kwhTotal = payload.accumulated;
			console.log("total: " + total);
			$('#kwh-today').html(total + " kwh");
		}
	}
}
