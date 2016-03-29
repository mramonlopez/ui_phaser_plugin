'use strict';

Phaser.Plugin.UI = function (game, parent) {
	Phaser.Plugin.call(this, game, parent);

	this.game.input.keyboard.addCallbacks(this, this.onKeyDown, null, this.onKeyPress);
};

Phaser.Plugin.UI.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.UI.prototype.constructor = Phaser.Plugin.UI;

Phaser.Plugin.UI.prototype._components = [];

Phaser.Plugin.UI.prototype.seletedItem = -1;

Phaser.Plugin.UI.prototype.addTextBox = function (x, y, width, height, maxLength) {
	var tb = new Phaser.Plugin.UI.TextBox(width, height, maxLength, this.game);

	tb.x = x;
	tb.y = y;

	this._components.push(tb);

	if (this.seletedItem < 0) {
		this.seletedItem = 0;
	}

	return tb;
}

Phaser.Plugin.UI.prototype.onKeyDown = function(event) {
	if (event.keyCode === Phaser.KeyCode.BACKSPACE) {
		this.onKeyPress(Phaser.KeyCode.BACKSPACE);
	} else if (event.keyCode === 13) {
		this.nextComponent();
	} else if (event.keyCode === 9) {
		this.nextComponent();
	} else {
		console.log('KEY', event.keyCode);
	}	
};

Phaser.Plugin.UI.prototype.onKeyPress = function(character) {
	if (this.seletedItem >= 0) {
		this._components[this.seletedItem].sendKey(character);
	}
};

Phaser.Plugin.UI.prototype.nextComponent = function() {
	if (this._components.length > 1) {
		this.seletedItem = (this.seletedItem === this._components.length - 1) ? 0 : this.seletedItem + 1; 
	}
}
