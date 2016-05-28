
  'use strict';
  function Play() {}

  Play.prototype = {
    create: function() {
      this.ui = this.game.plugins.add(Phaser.Plugin.UI);

      this.ui.addTextBox(0, 0, 200, 50, 20);
      this.ui.addTextBox(0, 80, 200, 50, 20);
    },
    update: function() {

    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };
  
  module.exports = Play;