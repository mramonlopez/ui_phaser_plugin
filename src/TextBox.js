/************************************************
TextBox
*/
 'use strict';

Phaser.Plugin.UI.TextBox = function (width, height, maxLength, game, parent) {
	//Phaser.Group.call(this, game, parent);

	this.text = '';

	this.width = width;

	this.height = height;

	this.maxLength = maxLength;
};

//Phaser.Plugin.UI.TextBox.prototype = Object.create(Phaser.Group.prototype);
Phaser.Plugin.UI.TextBox.prototype.constructor = Phaser.Plugin.UI.TextBox;

Phaser.Plugin.UI.TextBox.prototype.sendKey = function(key) {
	if (key === Phaser.KeyCode.BACKSPACE) {
		this.text = this.text(0, this.text.length - 1);
	} else  if (this.text.length < this.maxLength) {
		this.text += key;
	}

	console.log('TEXT', this.text);
}