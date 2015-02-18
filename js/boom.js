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
