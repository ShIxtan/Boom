Boom.MainMenu = function (game) {
};

Boom.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		//this.add.sprite(0, 0, 'titlepage');
    text = this.add.text(0, 0, "Click Anywhere to Start!", {
          font: "65px Arial",
          fill: "#ff0044",
    });

		this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');

	},

	update: function () {
    if (this.input.mousePointer.isDown){
      this.startGame();
    }
		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {
		//	And start the actual game
		this.state.start('Game');
	}

};
