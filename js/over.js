Boom.Over = function (game) {
};

Boom.Over.prototype = {
  init: function (score, goal, level) {
    this.score = score;
    this.goal = goal;
    this.level = level;
  },

	create: function () {
    if (this.score < this.goal){
      scoreText = this.add.text(0, 200, this.score + " / " + this.goal + " - Almost There!\n\nClick Anywhere to Try Again!", {
            font: "40px Arial",
            fill: "#ff0044",
      });
    } else {
      scoreText = this.add.text(0, 200, this.score + " / " + this.goal + " - Great Job!\n\nClick Anywhere for Next level!", {
            font: "40px Arial",
            fill: "#3BC936",
      });
      this.level += 1;
    }

    if (this.level > 10){
      scoreText.setText("You Win! \n\n Try again?")
      this.level = 1;
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
    3: 17,
    4: 20,
    5: 25,
    6: 35,
    7: 40,
    8: 50,
    9: 58,
    10: 65,
  }

};
