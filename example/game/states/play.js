
  'use strict';
  function Play() {}

  Play.prototype = {
    create: function() {
      this.ui = this.game.plugins.add(Phaser.Plugin.UI);

      this.ui.addTextBox(this.game.world.centerX - 100, 80, 200, 20, 40);
      this.ui.addTextBox(this.game.world.centerX - 100, 110, 200, 20, 20);
    },
    update: function() {

    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };
  
  module.exports = Play;