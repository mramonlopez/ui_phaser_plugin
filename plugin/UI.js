/* 2016-03-28 */
Phaser.Plugin.UI = function (game, parent) {
	Phaser.Plugin.call(this, game, parent);

	this.game.input.keyboard.addCallbacks(this, this.onKeyDown, null, this.onKeyPress);
};

Phaser.Plugin.UI.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.UI.prototype.constructor = Phaser.Plugin.UI;

Phaser.Plugin.UI.prototype.add = {
	textBox: function (x, y, width, height, maxLength) {
		var tb = new Phaser.Plugin.UI.TextBox(width, height, maxLength, this.game, this);

		tb.x = x;
		tb.y = y;

		return tb;
	}
};

Phaser.Plugin.UI.prototype.onKeyDown = function(event) {
	if (event.keyCode === 8) {
		console.log('BACKSPACE');
	} else if (event.keyCode === 13) {
		console.log('ENTER');
	} else if (event.keyCode === 9) {
		console.log('TAB');
	} else {
		console.log('KEY', event.keyCode);
	}	
};

Phaser.Plugin.UI.prototype.onKeyPress = function(character) {
	console.log('onKeyPress', character);
};


/************************************************
TextBox
*/
Phaser.Plugin.UI.TextBox = function (game, parent) {
	Phaser.Group.call(this, game, parent);
};

Phaser.Plugin.UI.TextBox.prototype = Object.create(Phaser.Group.prototype);
Phaser.Plugin.UI.TextBox.prototype.constructor = Phaser.Plugin.UI.TextBox;