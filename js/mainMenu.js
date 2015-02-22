Boom.MainMenu = function (game) {
};

Boom.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		//this.add.sprite(0, 0, 'titlepage');
    this.text = this.add.text(400, 200, "Click Anywhere to Start!", {
          font: "50px Arial",
          fill: "#ff0044",
					align: "center"
    });

		this.text.x = 400 - (this.text.width * 0.5);
	},

	update: function () {
    if (this.input.mousePointer.isDown){
      this.startGame();
    }
	},

	startGame: function (pointer) {
		//	And start the actual game
		this.state.start('Game', true, false, 2, 5, 1);
	}

};
