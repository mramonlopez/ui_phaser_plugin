/************************************************
TextBox
************************************************/
'use strict';

Phaser.Plugin.UI.TextBox = function (width, height, maxLength, game, parent) {
	Phaser.Group.call(this, game);

	this.text = '';

	this.width = width;

	this.height = height;

	this.maxLength = maxLength;

	this.background = this.game.add.graphics(0, 0, this);
	this.background.beginFill(0x202020);
	this.background.drawRect(0, 0, width, height);
	this.background.endFill();

	this._text = this.game.add.Text

	var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    this._text = game.add.text(0, 0, "", style, this);
};

Phaser.Plugin.UI.TextBox.prototype = Object.create(Phaser.Group.prototype);
Phaser.Plugin.UI.TextBox.prototype.constructor = Phaser.Plugin.UI.TextBox;

Phaser.Plugin.UI.TextBox.prototype.sendKey = function(key) {
	if (typeof key === "number") {
		if (key === Phaser.KeyCode.BACKSPACE) {
			this.text = this.text.substring(0, this.text.length - 1);
		} 
	} else if (this.text.length < this.maxLength && key.charCodeAt(0) >= Phaser.KeyCode.SPACEBAR) {
		this.text += key;
	}

	this._text.text = this.text;

	console.log('TEXT:', this.text);
}
