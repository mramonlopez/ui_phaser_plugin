/************************************************
TextBox
*/
Phaser.Plugin.UI.TextBox = function (game, parent) {
	Phaser.Group.call(this, game, parent);
};

Phaser.Plugin.UI.TextBox.prototype = Object.create(Phaser.Group.prototype);
Phaser.Plugin.UI.TextBox.prototype.constructor = Phaser.Plugin.UI.TextBox;