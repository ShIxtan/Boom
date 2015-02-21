Boom.Over = function (game) {
};

Boom.Over.prototype = {
  init: function (score, goal, level) {
    this.score = score;
    this.goal = goal;
    this.level = level;
  },

	create: function () {
    text = this.add.text(0, 0, "Click Anywhere to Start!", {
          font: "65px Arial",
          fill: "#ff0044",
    });

    if (this.score < this.goal){
      scoreText = this.add.text(200, 200, this.score + " / " + this.goal + "  Try Again!", {
            font: "40px Arial",
            fill: "#ff0044",
      });
    } else {
      scoreText = this.add.text(200, 200, this.score + " / " + this.goal + "  Next level!", {
            font: "40px Arial",
            fill: "#ff0044",
      });
      this.level += 1;
    }
	},

	update: function () {
    if (this.input.mousePointer.isDown){
      this.startGame();
    }
	},

	startGame: function (pointer) {
		this.state.start('Game', true, false, this.goals[this.level], this.counts[this.level], this.level);
	},

  goals: {
    1: 2,
    2: 3,
    3: 4,
    4: 6,
    5: 8,
    6: 12,
    7: 20,
    8: 30,
    9: 40,
    10: 50,
  },

  counts: {
    1: 5,
    2: 8,
    3: 15,
    4: 20,
    5: 25,
    6: 35,
    7: 40,
    8: 50,
    9: 58,
    10: 65,
  }

};
