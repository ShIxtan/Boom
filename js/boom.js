;(function(){
    if (typeof Boom === "undefined") {
      window.Boom = {};
    }

    var Boom = window.Boom = function(stage, renderer){
      this.stage = stage;
      this.renderer = renderer;
      this.circles = [];
    }

    var addCircle = Boom.prototype.addCircle = function(){
      circle = new Circle([300, 300]);
      this.stage.addChild(circle.sprite);
      circles.push(circle)
    }

    var start = Boom.prototype.start = function(){
      this.addCircle()

      requestAnimFrame( this.animate.bind(this) );
    }

    var step = Boom.prototype.step = function step(){
      this.circle.sprite.x += this.circle.dir[0];
      this.circle.sprite.y += this.circle.dir[1];
    }

    var animate = Boom.prototype.animate = function animate() {

        requestAnimFrame( animate.bind(this) );

        this.step();

        // render the stage
        this.renderer.render(stage);
    }
})();
