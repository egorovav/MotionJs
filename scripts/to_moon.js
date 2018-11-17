var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const clearBtn = document.querySelector('#clear');
const vxInput = document.querySelector('#vx');
const vyInput = document.querySelector('#vy');
const isDrawTracksInput = document.querySelector('#isTracks');

var _items = [];

var y = 200 * Math.sqrt(3) + 50;
var v = 0.9;

//G = 6.67 * 10^-11

// Lunar
// mass = 7.3477 * 20^22	(70)
// radius = 1.737 * 10^6	(8)
// orbit = 4 * 10^8 		(360)

// Earth 
// mass = 6 * 10^24		(5860)
// radius = 6.4 * 10^6		(30)

var _motionEarth = new GravityMotion(new Vector(-0.048, 0), _items);
var _Earth = new Item('#0000FF', new Point(600, 420), _motionEarth, 5860, 30);
_items.push(_Earth);

var _motionMoon = new GravityMotion(new Vector(4, 0), _items);
var _Moon = new Item('#AA8866', new Point(600, 60), _motionMoon, 70, 8);
_items.push(_Moon);

//var _motionShattle = new GravityMotion(new Vector(17.5, -10.61), _items);
//var _motionShattle = new GravityMotion(new Vector(13.71, -16.69), _items);
//var _motionShattle = new GravityMotion(new Vector(13, -17.44), _items);
//var _motionShattle = new GravityMotion(new Vector(13, -17.439), _items);
//var _motionShattle = new GravityMotion(new Vector(13, -17.43900001), _items);
//12.77, 17.641281990048
var vx = parseFloat(vxInput.value);
var vy = -.parseFloat(vyInput.value);

var _motionShattle = new GravityMotion(new Vector(vx, vy), _items);
var _shattle = new Item('#AAAAAA', new Point(600, 390), _motionShattle, 0, 3); 
_items.push(_shattle);

function drawItem(item) {

	//ctx.beginPath();
	//ctx.fillStyle = 'rgba(0, 0, 0, 1)';
	//ctx.arc(item.prevPosition.x, item.prevPosition.y, item.radius + 1, 0, 2 * Math.PI);
	//ctx.fill();

	ctx.beginPath();
	ctx.fillStyle = item.color;
	ctx.arc(item.position.x, item.position.y, item.radius, 0, 2 * Math.PI);
	ctx.fill();	

	if(isDrawTracksInput.checked && item.track.length > 0) {

		ctx.beginPath();
		ctx.strokeStyle = item.color;
		ctx.moveTo(item.track[0].x, item.track[0].y);	

		for(var i = 1; i < item.track.length; i++) {

			ctx.lineTo(item.track[i].x, item.track[i].y);
		}

		ctx.stroke();
	}
}

function loop() {

	ctx.fillStyle = 'rgba(0, 0, 0, 1)';
 	ctx.fillRect(0, 0, width, height);

  	for(var i = 0; i < _items.length; i++) {
		
		var _item = _items[i];
    		drawItem(_item);
    		_item.updatePosition(1);
  	}

	startMotionRequestId = requestAnimationFrame(loop);
}

ctx.fillStyle = 'rgba(0, 0, 0, 1)';
ctx.fillRect(0, 0, width, height);
// loop();

var startMotionRequestId;

startBtn.addEventListener('click', function() { 

	//var vx = vxInput.value;
	//var vy = vyInput.value;
	//_motionShattle = new GravityMotion(new Vector(vx, vy), _items);
	//_shattle = new Item('#AAAAAA', new Point(600, 390), _motionShattle, 0, 3); 

	startMotionRequestId = requestAnimationFrame(loop); 
});

stopBtn.addEventListener('click', function() { cancelAnimationFrame(startMotionRequestId); });

clearBtn.addEventListener('click', function() { 

	for(var i = 0; i < _items.length; i++) {

		_items[i].track = [];
	}

	ctx.fillStyle = 'rgba(0, 0, 0, 1)';
 	ctx.fillRect(0, 0, width, height);

  	for(var i = 0; i < _items.length; i++) {
		
		var _item = _items[i];
    		drawItem(_item);
  	}
});
