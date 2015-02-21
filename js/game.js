Boom.Game = function (game){
  this.unclicked = true;
}

Boom.Game.prototype = {

  preload: function() {
    this.smallBMP = this.add.bitmapData(20,20);

    // Draw circle
    this.smallBMP.ctx.fillStyle = '#999999';
    this.smallBMP.ctx.beginPath();
    this.smallBMP.ctx.arc(10, 10, 10, 0, Math.PI*2, true);
    this.smallBMP.ctx.closePath();
    this.smallBMP.ctx.fill();

    this.largeBMP = this.add.bitmapData(80,80);

    // Draw circle
    this.largeBMP.ctx.fillStyle = '#999999';
    this.largeBMP.ctx.beginPath();
    this.largeBMP.ctx.arc(40, 40, 40, 0, Math.PI*2, true);
    this.largeBMP.ctx.closePath();
    this.largeBMP.ctx.fill();
  },

  create: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.circles = this.add.group();
    this.expanded = this.add.group();

    for (var i = 0; i < 5; i++){
      var pos = this.randomPos();
      this.addCircle(pos)
    }

    this.score = 0;
    this.goal = 2

    this.text = this.add.text(0, 0, "0 / " + this.goal, {
      font: "65px Arial",
      fill: "#ff0044",
    });
  },

  update: function() {
    if (!this.unclicked){
      if (this.expanded.countLiving() > 0){
        this.physics.arcade.overlap(this.expanded, this.circles, this.collisionHandler, null, this);
      } else {
        this.gameOver();
      }
    }
    if (this.input.mousePointer.isDown && this.unclicked) {
      cir = this.addCircle([this.input.x, this.input.y])
      this.expand(cir)
      this.unclicked = false;
    }
  },

  expand: function(circle){
    this.addLarge([circle.x, circle.y], circle.tint)
    circle.kill();
  },

  randomPos: function(){
    return [Math.random() * 800, Math.random() * 600];
  },

  addCircle: function(pos){
    var cir = this.circles.create(pos[0], pos[1], this.smallBMP)
    cir.anchor.setTo(0.5, 0.5);
    this.physics.arcade.enable(cir)
    cir.body.velocity.x = this.rnd.integerInRange(-100, 100);
    cir.body.velocity.y = this.rnd.integerInRange(-100, 100);
    cir.body.bounce.setTo(1, 1);
    cir.body.collideWorldBounds = true;
    cir.tint = '0x' + Math.floor(Math.random()*16777215).toString(16);
    return cir;
  },

  addLarge: function(pos, tint){
    var cir = this.expanded.create(pos[0], pos[1], this.largeBMP)
    cir.anchor.setTo(0.5, 0.5);
    this.physics.arcade.enable(cir)
    cir.expanded = true;
    cir.tint = tint;
    setTimeout(function(){
      cir.kill();
    }, 2000)
  },

  collisionHandler: function(expanded, circle){
    this.expand(circle);
    this.score += 1;
    this.text.setText(this.score + " / " + this.goal);
  },

  gameOver: function(){

  }
}
