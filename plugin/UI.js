/* 2016-05-30 */
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
		this._components[this.seletedItem].setFocused(true);
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
		this._components[this.seletedItem].setFocused(false);
		this.seletedItem = (this.seletedItem === this._components.length - 1) ? 0 : this.seletedItem + 1; 
		this._components[this.seletedItem].setFocused(true);
	}
}



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

	this._focused = false;
	this._background = this._createBox(0x202020);

	var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" },
		textView = game.add.text(0, 0, "", style, this);

	this.setTextView(textView);
	this.setCursor(this._createCursor());

	this.mask = this._createBox(0xffffff);
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

TextBox.prototype.setCursor = function(cursor) {
	this._cursor && this._cursor.destroy();

	this._cursor = cursor;
	this._cursor.visible = false;
}

TextBox.prototype.setFocused = function(focus) {
	this._focused = focus;
	this._cursor.visible = focus;

	this._updateView();
}

TextBox.prototype._createBox = function(color) {
	var box = this.game.add.graphics(0, 0, this);
	box.beginFill(color);
	box.drawRect(0, 0, this.boxWidth, this.boxHeight);
	box.endFill();

	return box;
}

TextBox.prototype._updateView = function() {
	var width = this._textView.width + this._cursor.width;
	if (this._focused && width > this.boxWidth) {
		this._textView.x = this.boxWidth - width;
	} else {
		this._textView.x = 0;
	}

	this._cursor.x = this._textView.x + this._textView.width;
}

TextBox.prototype._createCursor = function() {
	var width = 2,
		bar = this.game.add.graphics(0, 0);

	bar.beginFill(0xffffff, 1);
	bar.drawRect(0, 0, width, this.boxHeight);
	bar.endFill();

	var cursor = this.create(0, 0, bar.generateTexture());

	bar.destroy();

	console.log('cursor creado');
	console.log(this.game.cache);
	return cursor;
}

Phaser.Plugin.UI.TextBox = TextBox;
