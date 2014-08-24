module Rox {
    export class Boot extends Phaser.State {
        preload() {
            this.game.load.image('rox-idle', 'images/sprites/rox-idle.png');
        }

        create() {
            this.stage.setBackgroundColor(0xFFFFFF);
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.state.start('Preloader', true, false);
        }
    }
}