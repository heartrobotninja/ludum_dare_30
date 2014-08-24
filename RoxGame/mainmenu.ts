module Rox {
    export class MainMenu extends Phaser.State {

        roxMain: Phaser.Sprite;

        preload() {
            this.roxMain = this.game.add.sprite(0, 0, 'rox-main');
            this.roxMain.scale.setTo(20, 20);
        }

        create() {
            this.game.stage.setBackgroundColor(0xFFFFFF);
            var tween = this.add.tween(this.roxMain.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.In, true);
        }

        update() {
            if(this.game.input.keyboard.justReleased(Phaser.Keyboard.ENTER)) {
                this.game.state.start('Overworld', true, false);
            }
        }
    }
}