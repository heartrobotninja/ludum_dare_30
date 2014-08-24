module Rox {
    export class Preloader extends Phaser.State {

        roxIdle: Phaser.Sprite;

        preload() {
            // Setup Preload Image
            this.roxIdle = this.add.sprite(64, 64, 'rox-idle');
            this.load.setPreloadSprite(this.roxIdle);
            this.roxIdle.scale.setTo(1, 1);

            // Rox character sprites
            this.load.spritesheet('rox-animated', 'images/sprites/animation-test.png', 64, 64, 8);
            this.load.image('rox-idle', 'images/sprites/rox-idle.png');
            this.load.image('magic-bag', 'images/sprites/bag.png');

            // World tile sets
            this.load.image('ground', 'images/tiles/64ground.png');
            this.load.image('window-bottom', 'images/tiles/window-bottom.png');
            this.load.image('window-clear', 'images/tiles/window-clear.png');
            this.load.image('window-glare', 'images/tiles/window-glare.png');
            this.load.image('window-left-corner', 'images/tiles/window-left-corner.png');
            this.load.image('window-left-side', 'images/tiles/window-left-side.png');
            this.load.image('bag-clear', 'images/tiles/bag-clear.png');
            this.load.image('bag-window-bottom', 'images/tiles/bag-window-bottom.png');
            this.load.image('bag-window-left-side', 'images/tiles/bag-window-left-side.png');
            this.load.image('bag-window-left-corner', 'images/tiles/bag-window-left-corner.png');

            // Loading audio sets
            this.load.audio('overworld', 'music/rox-ow2.mp3', true);
            this.load.audio('overworld2', 'music/rox-ow-6422.mp3', true);
        }

        create() {
            var tween = this.add.tween(this.roxIdle.scale).to({ x: 10, y: 10 }, 2000, Phaser.Easing.Sinusoidal.InOut);
        }
    }
}