var kwhTotal;


function setDaily(msg) {
	if(msg.topic == 'VideoFeedbackDaily') {
		var payload = msg.payload.split(/,|:/);
		
		if(kwhTotal != payload[5].replace(/"/g,'')){
			kwhTotal = payload[5].replace(/"/g,'');
		
			console.log("Topic: " + msg.topic + " Payload: " + msg.payload);
			console.log("total: " + kwhTotal);
		
			var price = &('#price').val;
		
			//if(price == undefined)
				//price = 1.3;
			
			
			$('#kwh-today').html(kwhTotal + " kWh");
			$('#money-today').html((kwhTotal*1.3).toFixed(2) + " kr");
		}
	}
}
