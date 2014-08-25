﻿window.onload = function () {
    var game = new Rox.RoxGame();
};
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Rox;
(function (Rox) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.game.load.image('rox-idle', 'images/sprites/rox-idle.png');
        };

        Boot.prototype.create = function () {
            this.stage.setBackgroundColor(0xFFFFFF);
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    Rox.Boot = Boot;
})(Rox || (Rox = {}));
var Rox;
(function (Rox) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.preload = function () {
            this.roxMain = this.game.add.sprite(0, 0, 'rox-main');
            this.roxMain.scale.setTo(20, 20);
        };

        MainMenu.prototype.create = function () {
            this.game.stage.setBackgroundColor(0xFFFFFF);
            var tween = this.add.tween(this.roxMain.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.In, true);
        };

        MainMenu.prototype.update = function () {
            if (this.game.input.keyboard.justReleased(Phaser.Keyboard.ENTER)) {
                this.game.state.start('Overworld', true, false);
            }
        };
        return MainMenu;
    })(Phaser.State);
    Rox.MainMenu = MainMenu;
})(Rox || (Rox = {}));
var Rox;
(function (Rox) {
    var Overworld = (function (_super) {
        __extends(Overworld, _super);
        function Overworld() {
            _super.apply(this, arguments);
        }
        Overworld.prototype.preload = function () {
        };

        Overworld.prototype.create = function () {
        };

        Overworld.prototype.update = function () {
        };
        return Overworld;
    })(Phaser.State);
    Rox.Overworld = Overworld;
})(Rox || (Rox = {}));
var Rox;
(function (Rox) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            // Setup Preload Image
            this.roxIdle = this.game.add.sprite(this.world.centerX, this.world.centerY, 'rox-idle');
            this.roxIdle.anchor.setTo(0.5, 0.5);
            this.roxIdle.scale.setTo(0.2, 0.2);

            //this.load.setPreloadSprite(this.roxIdle);
            // Main Menu Graphic
            this.load.image('rox-main', 'images/sprites/rox-main.png');

            // Rox character sprites
            this.load.spritesheet('rox-animated', 'images/sprites/animation-test.png', 64, 64, 8);
            this.load.image('rox-idle', 'images/sprites/rox-idle.png');
            this.load.image('magic-bag', 'images/sprites/bag.png');

            // Snow sprites
            game.load.image('flake1', '/RoxGame/images/sprites/small-flake.png');
            game.load.image('flake2', '/RoxGame/images/sprites/small-flake2.png');
            game.load.image('flake3', '/RoxGame/images/sprites/large-flake.png');

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
        };

        Preloader.prototype.create = function () {
            this.game.stage.setBackgroundColor(0xFFFFFF);
            var tween = this.add.tween(this.roxIdle.scale).to({ x: 6, y: 6 }, 4000, Phaser.Easing.Bounce.InOut, true);
            tween.onComplete.add(this.mainMenu, this);
        };

        Preloader.prototype.mainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    Rox.Preloader = Preloader;
})(Rox || (Rox = {}));
var Rox;
(function (Rox) {
    var RoxGame = (function (_super) {
        __extends(RoxGame, _super);
        function RoxGame() {
            _super.call(this, 800, 600, Phaser.AUTO, 'container', null);

            this.state.add('Boot', Rox.Boot, false);
            this.state.add('Preloader', Rox.Preloader, false);
            this.state.add('MainMenu', Rox.MainMenu, false);
            this.state.add('Overworld', Rox.Overworld, false);

            //this.state.add('BagWorld', BagWorld, false);
            this.state.start('Boot');
        }
        return RoxGame;
    })(Phaser.Game);
    Rox.RoxGame = RoxGame;
})(Rox || (Rox = {}));
