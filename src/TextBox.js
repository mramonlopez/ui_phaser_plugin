/************************************************
TextBox
************************************************/
'use strict';

var TextBox = function (width, height, maxLength, game, parent) {
	Phaser.Group.call(this, game);

	this.text = '';

	this.boxWidth = width;

	this.boxHeight = height;

	this.maxLength = maxLength;

	this._text = this.game.add.Text

	this._background = this._createBox(0x202020);
	this.mask = this._createBox(0xffffff);

	var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" },
		textView = game.add.text(0, 0, "", style, this);

	this.setTextView(textView);
};

TextBox.prototype = Object.create(Phaser.Group.prototype);
TextBox.prototype.constructor = TextBox;

TextBox.prototype.sendKey = function(key) {
	if (typeof key === "number") {
		if (key === Phaser.KeyCode.BACKSPACE) {
			this.text = this.text.substring(0, this.text.length - 1);
		} 
	} else if (this.text.length < this.maxLength && key.charCodeAt(0) >= Phaser.KeyCode.SPACEBAR) {
		this.text += key;
	}

	this._textView.text = this.text;
	this._updateView();
}

TextBox.prototype.setTextView = function(textView) {
	this._textView && this._textView.destroy();

	this._textView = textView;
}

TextBox.prototype._createBox = function(color) {
	var box = this.game.add.graphics(0, 0, this);
	box.beginFill(color);
	box.drawRect(0, 0, this.boxWidth, this.boxHeight);
	box.endFill();

	return box;
}

TextBox.prototype._updateView = function() {
	if (this._textView.width > this.boxWidth) {
		this._textView.x = this.boxWidth - this._textView.width;
	} else {
		this._textView.x = 0;
	}
}

Phaser.Plugin.UI.TextBox = TextBox;
