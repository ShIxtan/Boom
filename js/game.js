Boom.Game = function (game){
}

Boom.Game.prototype = {
  init: function(goal, circleCount, level){
    this.unclicked = true;
    this.score = 0;
    this.goal = goal;
    this.circleCount = circleCount
    this.level = level
  },

  preload: function() {
    this.largeBMP = this.add.bitmapData(80,80);

    // Draw circle
    this.largeBMP.ctx.fillStyle = '#999999';
    this.largeBMP.ctx.beginPath();
    this.largeBMP.ctx.arc(40, 40, 40, 0, Math.PI*2, true);
    this.largeBMP.ctx.closePath();
    this.largeBMP.ctx.fill();
  },

  create: function() {
    this.popSound = this.game.add.audio('pop');
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.circles = this.add.group();
    this.expanded = this.add.group();

    for (var i = 0; i < this.circleCount; i++){
      var pos = this.randomPos();
      this.addCircle(pos)
    }

    this.text = this.add.text(0, 0, "0 / " + this.goal, {
      font: "65px Arial",
      fill: "#ffffff",
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
    this.add.tween(circle.scale).to({ x: 1, y: 1}, 200, Phaser.Easing.Bounce.Out, true)
    circle.sprite.alpha = 0.7;
    this.expanded.add(circle);
    this.circles.remove(circle);
    circle.body.velocity.x = 0;
    circle.body.velocity.y = 0;
    this.popSound.play();
    setTimeout(function(){
      var tween = this.add.tween(circle.scale).to({ x: 0.1, y: 0.1}, 200, Phaser.Easing.Bounce.Out, true)
      tween.onComplete.add(function(){
        circle.kill();
      }, this)
    }.bind(this), 2000)
  },

  randomPos: function(){
    return [Math.random() * 800, Math.random() * 600];
  },

  addCircle: function(pos){
    var cir = this.circles.create(pos[0], pos[1], this.largeBMP)
    cir.anchor.setTo(0.5, 0.5);
    cir.scale.setTo(.25, .25);
    this.physics.arcade.enable(cir)
    cir.body.velocity.x = this.rnd.integerInRange(-100, 100);
    cir.body.velocity.y = this.rnd.integerInRange(-100, 100);
    cir.body.bounce.setTo(1, 1);
    cir.body.collideWorldBounds = true;
    cir.tint = '0x' + Math.floor(Math.random()*16777215).toString(16);
    return cir;
  },

  collisionHandler: function(expanded, circle){
    this.expand(circle);
    this.score += 1;
    this.text.setText(this.score + " / " + this.goal);
  },

  gameOver: function(){
    this.state.start("Over", true, false, this.score, this.goal, this.level)
  }
}
