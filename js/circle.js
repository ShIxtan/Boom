;(function(){
    if (typeof Circle === "undefined") {
      window.Circle = {};
    }

    Circle = window.Circle = function(pos){
      this.sprite = this.genSprite(pos);
      this.dir = this.randomDir();
    }

    var genSprite = Circle.prototype.genSprite = function(pos){
      var circle = new PIXI.Graphics();
      circle.beginFill(0xFFFFFF);
      circle.drawCircle(0,0,100);
      var circleTexture = circle.generateTexture();
      var sprite = new PIXI.Sprite(circleTexture);
      sprite.tint = 0xBEABEA;
      sprite.scale = new PIXI.Point(0.1, 0.1);
      sprite.x = pos[0];
      sprite.y = pos[1];

      return sprite;
    }

    var randomDir = Circle.prototype.randomDir = function(){
      return [Math.random(), Math.random()]
    }

    var move = Circle.prototype.move = function(){
      this.sprite.x += this.dir[0];
      this.sprite.y += this.dir[1];
    }

})();
