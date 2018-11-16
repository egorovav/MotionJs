function Point(x, y) {

	this.x = x;
	this.y = y;
}

function Vector(dx, dy) {

	this.dx = dx;
	this.dy = dy;
}

Vector.prototype.length = function() {

	return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
}

Vector.prototype.mult = function(k) {

	return new Vector(this.dx * k, this.dy * k);
}

Vector.prototype.add = function(v) {

	return new Vector(this.dx + v.dx, this.dy + v.dy);
}

function Item(color, position, motion, mass, radius) {

	this.color = color;
	this.position = position;
	this.motion = motion;
	this.startPosition = position;
	this.mass = mass;
	this.radius = radius;
	this.track = [];
	this.prevPosition = new Point(-1, -1);
}

Item.prototype.updatePosition = function(time) {

	this.track.push(this.position);
	this.prevPosition = this.position;
	this.position = this.motion.getPosition(this.position, time);
}

Item.prototype.clearTrack = function() {

	this.track = [];
}

Item.prototype.reset = function() {

	this.position = startPosition;
	this.motion.reset();
	this.clearTrack();
}

function MotionBase() {

	this.time = 0;
}


MotionBase.prototype.getPosition = function(point, time) {

	var s = this.getShift(point, time);
	return new Point(point.x + s.dx, point.y + s.dy);
}

function GravityMotion(velocity, items) {

	this.velocity = velocity;
	this.startVelocity = velocity;
	this.items = items;
}

GravityMotion.prototype = Object.create(MotionBase.prototype);
GravityMotion.prototype.constructor = MotionBase;

GravityMotion.prototype.getShift = function(point, time) {

	var a = new Vector(0, 0);

	for(var i = 0; i < this.items.length; i++) {

		var _item = this.items[i];

		if(_item.mass === 0) {

			continue;
		}

		var _position = _item.position;

		if(_item.motion.time > this.time) {

			_position = _item.prevPosition;
		}

		// var r = new Vector(point, _position);
		var r = new Vector(_position.x - point.x, _position.y - point.y);
		var l = r.length();
		// console.log(l);

		if(l === 0) {

			continue;
		} 
			
		var k = _item.mass / (l * l * l);
		a = a.add(r.mult(k));
	}

	var _dv = a.mult(time);
	var v = this.velocity.add(_dv);
	var s = v.mult(time);
	this.velocity = v;
	this.time += time;
	
	return s;
}

GravityMotion.prototype.reset = function() {

	this.velocity = startVelocity;
}