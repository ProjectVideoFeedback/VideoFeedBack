
var socket;
var measurement_data = [];
var start, end, time;
var wattSum = 0;
var totalCost = 0;

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

function measurement_storage(msg, date){

	measurement_data.push(
		{"buildingwatt": msg.payload, "date": date}
		);
}

function check(msg){
	if(msg.topic == 'buildingWatt'){
	
		end = new Date().getTime();
		time = end-start;
		start = end;
		wattSum += msg.payload;

		setTotalCost(money_converter(wattSum));
		//measurement_storage(msg, new Date());
		//console.log(msg.topic+' '+msg.payload+', time elapsed:'+time+', Date:'+new Date());
		//console.log("size: " + measurement_data.length + " buildingwatt: " + measurement_data[measurement_data.length-1]["buildingwatt"] + " Date: " + measurement_data[measurement_data.length-1]["date"]);
	}
}

//Sets the cost amount. It also checks weather of not the new cost has become greater that the previous total,
//And starts the drop coins.
function setTotalCost(cost){
	if(Math.floor(totalCost) < Math.floor(cost)){
		dropCoins(Math.floor(cost)-Math.floor(totalCost));
	}

	totalCost = cost;
	//Do code Set the cost of the HTML element...
}

//Make The coins in the movie fall down. starts and pauses the video at the right places.
function dropCoins(amount){
	//Do the drop coins code.
}

//Takes the total amount of watt and converts it to the amount of money it costs.
function money_converter(totalwatt){

	var priceKWH = document.getElementByID("price").value;
	var cost = (totalwatt / 1000)*900 * priceKWH;//Vet inte om denna conversion är rätt men lägg en kik.
	//Do convert code
	return cost;
}

