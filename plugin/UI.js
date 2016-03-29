/* 2016-03-29 */
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
	var tb = new Phaser.Plugin.UI.TextBox(width, height, maxLength, this.game, this);

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



/************************************************
TextBox
************************************************/
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
		this.text = this.text.substring(0, this.text.length - 1);
	} else  if (this.text.length < this.maxLength) {
		this.text += key;
	}

	console.log('TEXT:', this.text);
}
