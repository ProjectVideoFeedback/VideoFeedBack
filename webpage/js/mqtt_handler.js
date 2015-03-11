var daily;
var monthly;

function setDaily(msg) {
	if(msg.topic == 'VideoFeedbackDailyMonthly') {
		var payload = msg.payload.split(/,|:/);
		
		if(daily != payload[5].replace(/"/g,'')){
			daily = payload[5].replace(/"/g,'');
			
			monthly = payload[7].replace(/"/g,'');
			
			console.log("Topic: " + msg.topic + " Payload: " + msg.payload);
			console.log("totalD: " + daily);
			console.log("totalM: " + monthly);
		
			updateStat();
		}
	}
}

function updateStat(){
	var price = $('#price').val();
	price = price.replace(/,/g,'.');
	price = parseFloat(price);
	if(price == undefined)
		price = 1.3;
	
	
	$('#kwh-today').html(daily + " kWh");
	$('#money-today').html((daily*price).toFixed(2) + " kr");
	
	$('#kwh-month').html(monthly + " kWh");
	$('#money-month').html((monthly*price).toFixed(2) + " kr");
}