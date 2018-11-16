var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var _items = [];

var y = 200 * Math.sqrt(3) + 50;
var v = 0.92;

var _motion1 = new GravityMotion(new Vector(-2 * v, 0.1), _items);
var _item1 = new Item('#00FF00', new Point(400, 50), _motion1, 1700, 10);
_items.push(_item1);

var _motion2 = new GravityMotion(new Vector(v, v * Math.sqrt(3)), _items);
var _item2 = new Item('#888888', new Point(200, y), _motion2, 1700, 10);
_items.push(_item2);

var _motion3 = new GravityMotion(new Vector(v, -v * Math.sqrt(3)), _items);
var _item3 = new Item('#0000FF', new Point(600, y), _motion3, 1700, 10); 
_items.push(_item3);

function drawItem(item) {

	ctx.beginPath();
	ctx.fillStyle = 'rgba(0, 0, 0, 1)';
	ctx.arc(item.prevPosition.x, item.prevPosition.y, item.radius + 1, 0, 2 * Math.PI);
	ctx.fill();

	ctx.beginPath();
	ctx.fillStyle = item.color;
	ctx.arc(item.position.x, item.position.y, item.radius, 0, 2 * Math.PI);
	ctx.fill();	

	if(item.track.length > 0) {

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

 	//ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
 	//ctx.fillRect(0, 0, width, height);

  	for(var i = 0; i < _items.length; i++) {
		
		var _item = _items[i];
    		drawItem(_item);
    		_item.updatePosition(0.1);
  	}

	requestAnimationFrame(loop);
}

ctx.fillStyle = 'rgba(0, 0, 0, 1)';
ctx.fillRect(0, 0, width, height);
loop();