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
      sprite.tint = '0x' + Math.floor(Math.random()*16777215).toString(16);
      sprite.scale = new PIXI.Point(0.07, 0.07);
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

      if (this.sprite.x < 0 || this.sprite.x > 600){
        this.dir[0] *= -1;
      }
      if (this.sprite.y < 0 || this.sprite.y > 600){
        this.dir[1] *= -1;
      }
    }

})();
