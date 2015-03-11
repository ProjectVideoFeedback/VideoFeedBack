var kwh-total;


function getDaily(msg){
	if(msg.topic == 'VideoFeedbackDaily')
	{
		var payload = msg.payload;
		console.log("Topic: " + msg.topic + " Payload: " + payload);
		if(kwh-total == undefined)
		{
			kwh-total = payload.accumulated;
			console.log("total: " + total); 
			$('#kwh-today').html(total + " kwh");
		}
	}
}