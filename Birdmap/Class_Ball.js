class Ball {
  constructor(x, y, d, obj){
	  this.x = x;
	  this.y = y;
	  this.h = false;
	  this.pinned = false;
	  this.visible = true;
	  this.d = d;
	  this.obj = obj;
	  this.color = obj.color;
  }
  
  show(p){
	  if (this.visible){
		  p.push();
		  p.fill(this.pinned ? '#FFFFFF' : this.color);
		  p.strokeWeight(this.pinned ? 3 : 0);
		  p.circle(this.x, this.y, this.h ? this.d * 1.3 : this.d);
		  p.pop();
	  }
  }
  
  hasCollision(p){
	  var collision = false;
	  
	  for (var i = 0; i < this.obj.balls.length; i++)
	  {
		  if (p.dist(this.obj.balls[i].x, this.obj.balls[i].y, this.x, this.y) < (this.obj.balls[i].d / 2 + this.d / 2) * 1.3)
		  {
			  collision = true;
			  break;
		  }
	  }
	  
	  return collision;
  }
  
  checkHover(p, x, y){
	  if (p.dist(x, y, this.x, this.y) < this.d / 2){
		  this.h = true;
		  hoveredCanvas = this.obj;
		  getHoveredBallInfo(this.obj, x, y);
	  }else{
		  if (this.h){
			this.h = false;
			getHoveredBallInfo(this.obj, x, y);
		  }
	  }
  }
}
