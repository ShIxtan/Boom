var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var smallBMP
var largeBMP
var unclicked = true;
var expanded;
var circles;
var goal;
var score;
var text;

function randomPos(){
  return [Math.random() * 800, Math.random() * 600];
}

function addCircle(pos){
  var cir = circles.create(pos[0], pos[1], smallBMP)
  cir.anchor.setTo(0.5, 0.5);
  game.physics.arcade.enable(cir)
  cir.body.velocity.x = game.rnd.integerInRange(-100, 100);
  cir.body.velocity.y = game.rnd.integerInRange(-100, 100);
  cir.body.bounce.setTo(1, 1);
  cir.body.collideWorldBounds = true;
  cir.tint = '0x' + Math.floor(Math.random()*16777215).toString(16);
  return cir;
}

function addLarge(pos, tint){
  var cir = expanded.create(pos[0], pos[1], largeBMP)
  cir.anchor.setTo(0.5, 0.5);
  game.physics.arcade.enable(cir)
  cir.expanded = true;
  cir.tint = tint;
  setTimeout(function(){
    cir.kill();
  }, 2000)
}

function preload() {
  smallBMP = game.add.bitmapData(20,20);

  // Draw circle
  smallBMP.ctx.fillStyle = '#999999';
  smallBMP.ctx.beginPath();
  smallBMP.ctx.arc(10, 10, 10, 0, Math.PI*2, true);
  smallBMP.ctx.closePath();
  smallBMP.ctx.fill();

  largeBMP = game.add.bitmapData(80,80);

  // Draw circle
  largeBMP.ctx.fillStyle = '#999999';
  largeBMP.ctx.beginPath();
  largeBMP.ctx.arc(40, 40, 40, 0, Math.PI*2, true);
  largeBMP.ctx.closePath();
  largeBMP.ctx.fill();
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  circles = game.add.group();
  expanded = game.add.group();

  for (var i = 0; i < 5; i++){
    var pos = randomPos();
    addCircle(pos)
  }

  score = 0;
  goal = 2

  text = game.add.text(0, 0, "0 / " + goal, {
        font: "65px Arial",
        fill: "#ff0044",
  });
}

function update() {
  if (!unclicked){
    game.physics.arcade.overlap(expanded, circles, collisionHandler, null, this);
  }
  if (game.input.mousePointer.isDown && unclicked) {
    cir = addCircle([game.input.x, game.input.y])
    expand(cir)
    unclicked = false;
  }
}

function expand(circle){
  addLarge([circle.x, circle.y], circle.tint)
  circle.kill();
}

function collisionHandler(expanded, circle){
  expand(circle);
  score += 1;
  text.setText(score + " / " + goal);
}
