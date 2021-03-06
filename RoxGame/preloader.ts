﻿module Rox {
    export class Preloader extends Phaser.State {

        roxIdle: Phaser.Image;

        preload() {
            // Setup Preload Image
            this.roxIdle = this.game.add.sprite(this.world.centerX, this.world.centerY, 'rox-idle');
            this.roxIdle.anchor.setTo(0.5, 0.5);
            this.roxIdle.scale.setTo(0.2, 0.2);
            //this.load.setPreloadSprite(this.roxIdle);

            // Main Menu Graphic
            this.load.image('rox-main', 'images/sprites/rox-main.png');

            // Rox character sprites
            this.load.spritesheet('rox', 'images/sprites/animation-test.png', 64, 47);
            this.load.image('rox-idle', 'images/sprites/rox-idle.png');
            this.load.image('bag', 'images/sprites/bag.png');

            // Snow sprites
            this.load.image('flake1', 'images/sprites/small-flake.png');
            this.load.image('flake2', 'images/sprites/small-flake2.png');
            this.load.image('flake3', 'images/sprites/large-flake.png');

            // World tile sets
            this.load.image('ground', 'images/tiles/64ground.png');
            this.load.image('window-bottom', 'images/tiles/window-bottom.png');
            this.load.image('window-clear', 'images/tiles/window-clear.png');
            this.load.image('window-glare', 'images/tiles/window-glare.png');
            this.load.image('window-left-corner', 'images/tiles/window-left-corner.png');
            this.load.image('window-left-side', 'images/tiles/window-left-side.png');
            this.load.image('bagworld', 'images/tiles/bag-clear.png');
            this.load.image('bag-window-bottom', 'images/tiles/bag-window-bottom.png');
            this.load.image('bag-window-left-side', 'images/tiles/bag-window-left-side.png');
            this.load.image('bag-window-left-corner', 'images/tiles/bag-window-left-corner.png');

            // Loading audio sets
            this.load.audio('overworld-music', 'music/rox-ow2.mp3', true);
            this.load.audio('bagworld-music', 'music/rox-bw2.mp3', true);
        }

        create() {
            this.game.stage.setBackgroundColor(0xFFFFFF);
            var tween = this.add.tween(this.roxIdle.scale).to({ x: 6, y: 6 }, 4000, Phaser.Easing.Bounce.InOut, true);
            tween.onComplete.add(this.mainMenu, this);

        }

        mainMenu() {
            this.game.state.start('MainMenu', true, false);
        }
    }
}