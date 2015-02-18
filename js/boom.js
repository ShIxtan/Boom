;(function(){
    if (typeof Boom === "undefined") {
      window.Boom = {};
    }

    var Boom = window.Boom = function(stage, renderer){
      this.stage = stage;
      this.renderer = renderer;
      this.circles = [];
    }

    var addCircles = Boom.prototype.addCircles = function(count){
      for (var i = 0; i < count; i++) {
        this.addCircle(this.randomPos());
      }
    }

    var addCircle = Boom.prototype.addCircle = function(pos){
      circle = new Circle(pos);
      this.stage.addChild(circle.sprite);
      circles.push(circle)
    }

    var start = Boom.prototype.start = function(count){
      this.addCircles(count)

      requestAnimFrame( this.animate.bind(this) );
    }

    var step = Boom.prototype.step = function step(){
      circles.forEach(function(circle){
        circle.move();
      })
    }

    var animate = Boom.prototype.animate = function animate() {

        requestAnimFrame( animate.bind(this) );

        this.step();

        // render the stage
        this.renderer.render(stage);
    }
})();
