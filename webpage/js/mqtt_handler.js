var kwhTotal;


function setDaily(msg) {
	if(msg.topic == 'VideoFeedbackDaily') {
		var payload = msg.payload.split(/,|:/);
		console.log("Topic: " + msg.topic + " Payload: " + msg.payload);
		kwhTotal = payload[5].replace(/"/g,'');
		console.log("total: " + kwhTotal);
		//var price = &('#price').val;
		
		//if(price == undefined)
			//price = 1.3;
			
			
		$('#kwh-today').html(kwhTotal + " kWh");
		$('#money-today').html((kwhTotal*1.3).toFixed(2) + " kr");
	}
}
