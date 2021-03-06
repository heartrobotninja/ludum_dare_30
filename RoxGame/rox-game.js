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
    // TODO: Clever Diplay: Something like a box when you win with your time.
    // TODO: ???
    // TODO: Profit!!!1!11!
    var Overworld = (function (_super) {
        __extends(Overworld, _super);
        function Overworld() {
            _super.apply(this, arguments);
            this.facing = 'left';
            // Counters
            this.secondsCounter = 0;
            this.finishCounter = 0;
            this.jumpCounter = 0;
            this.score = 0;
            this.max = 0;
        }
        Overworld.prototype.preload = function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.timer = this.game.time.create();
        };

        Overworld.prototype.create = function () {
            this.overworldBg = this.game.add.tileSprite(0, 0, 800, 600, 'window-clear');
            this.overworldBg.fixedToCamera = true;
            this.overworldBg.exists = true;

            this.bagworldBg = this.game.add.tileSprite(0, 0, 800, 600, 'bagworld');
            this.bagworldBg.fixedToCamera = true;
            this.bagworldBg.exists = false;

            this.overworldMusic = this.game.add.audio('overworld-music', 1, true);
            this.overworldMusic.play('', 0, 1, true);

            this.bagworldMusic = this.game.add.audio('bagworld-music', 1, true);

            this.platforms = this.game.add.group();

            this.platforms.enableBody = true;

            var ground = this.platforms.create(0, this.game.world.height - 40, 'ground');
            ground.scale.setTo(13, .65);
            ground.body.immovable = true;

            // Create left wall
            var wall = this.platforms.create(40, this.game.world.width - 40, 'ground');

            // Scale Wall
            wall.scale.setTo(.4, 13);

            var ledge = this.platforms.create(300, 300, 'ground');
            ledge.body.immovable = true;
            ledge.scale.x = 3;
            ledge.scale.y = .6;

            ledge = this.platforms.create(170, 430, 'ground');
            ledge.body.immovable = true;
            ledge.scale.x = 7;
            ledge.scale.y = .6;

            this.player = this.game.add.sprite(64, this.game.world.height - 150, 'rox');
            this.player.scale.x = .7;
            this.player.scale.y = .7;

            this.game.physics.arcade.enable(this.player);

            this.player.body.bounce.y = 0.08;
            this.player.body.gravity.y = 900;
            this.player.body.collideWorldBounds = true;
            this.player.animations.add('left', [3, 4, 5], 7, true);
            this.player.animations.add('right', [0, 1, 2], 7, true);

            this.bags = this.game.add.group();
            this.bags.enableBody = true;

            this.generateBags(15);

            this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '20px', fill: '#000' });

            this.back_emitter = this.game.add.emitter(this.game.world.centerX, -32, 600);
            this.back_emitter.makeParticles('flake1', [0]);
            this.back_emitter.makeParticles('flake2', [0]);
            this.back_emitter.makeParticles('flake3', [0]);
            this.back_emitter.maxParticleScale = 0.6;
            this.back_emitter.minParticleScale = 0.2;
            this.back_emitter.setYSpeed(20, 100);
            this.back_emitter.gravity = 0;
            this.back_emitter.width = this.game.world.width * 1.5;
            this.back_emitter.minRotation = 0;
            this.back_emitter.maxRotation = 40;

            this.mid_emitter = this.game.add.emitter(this.game.world.centerX, -32, 250);
            this.mid_emitter.makeParticles('flake1', [0]);
            this.back_emitter.makeParticles('flake2', [0]);
            this.back_emitter.makeParticles('flake3', [0]);
            this.mid_emitter.maxParticleScale = 1.2;
            this.mid_emitter.minParticleScale = 0.8;
            this.mid_emitter.setYSpeed(50, 150);
            this.mid_emitter.gravity = 0;
            this.mid_emitter.width = this.game.world.width * 1.5;
            this.mid_emitter.minRotation = 0;
            this.mid_emitter.maxRotation = 40;

            this.front_emitter = this.game.add.emitter(this.game.world.centerX, -32, 50);
            this.front_emitter.makeParticles('flake1', [0]);
            this.back_emitter.makeParticles('flake2', [0]);
            this.back_emitter.makeParticles('flake3', [0]);
            this.front_emitter.maxParticleScale = 1;
            this.front_emitter.minParticleScale = 0.5;
            this.front_emitter.setYSpeed(100, 200);
            this.front_emitter.gravity = 0;
            this.front_emitter.width = this.game.world.width * 1.5;
            this.front_emitter.minRotation = 0;
            this.front_emitter.maxRotation = 40;

            this.back_emitter.start(false, 14000, 20);
            this.mid_emitter.start(false, 12000, 40);
            this.front_emitter.start(false, 6000, 1000);
            this.timer.start();
        };

        Overworld.prototype.update = function () {
            this.game.physics.arcade.collide(this.player, this.platforms);
            this.game.physics.arcade.collide(this.bags, this.platforms);
            this.game.physics.arcade.overlap(this.player, this.bags, this.collectBags, null, this);
            this.player.body.velocity.x = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                //  Move to the left
                this.player.body.velocity.x = -150;

                if (this.facing != 'left') {
                    this.player.animations.play('left');
                    this.facing = 'left';
                }
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                //  Move to the right
                this.player.body.velocity.x = 150;

                if (this.facing != 'right') {
                    this.player.animations.play('right');
                    this.facing = 'right';
                }
            } else {
                if (this.facing != 'idle') {
                    this.player.animations.stop();

                    if (this.facing == 'left') {
                        this.player.frame = 6;
                    } else {
                        this.player.frame = 7;
                    }

                    this.facing = 'idle';
                }
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.player.body.touching.down) {
                this.player.body.velocity.y = -540;
                this.jumpCounter += 1;
            }
            if (this.score == 50) {
                this.generateBags(50);
            } else if (this.score == 200) {
                this.overworldMusic.stop();
                this.bagworldMusic.play('', 0, 1, true);

                this.overworldBg.exists = false;
                this.bagworldBg.exists = true;
                this.generateBags(200);
            } else if (this.score > 1000) {
                this.scoreText.text = '';
                this.scoreText = this.game.add.text(400, 300, 'You Win!!!\nYour Score: ' + String(this.score) + '\nYour Time: ' + String(this.timer.seconds) + '\nNumber of Jumps: ' + String(this.jumpCounter), { fontSize: '60px', fill: '#000' });
                this.game.state.game.paused = true;
            } else {
                this.scoreText.text = 'Score: ' + this.score + '\tJumps: ' + this.jumpCounter + '\tTime: ' + String(this.timer.seconds);
            }
        };

        Overworld.prototype.collectBags = function (player, onebag) {
            // Removes the star from the screen
            if (onebag) {
                onebag.kill();
            }

            //  Create a bag inside of the 'bags' group
            var onebag = this.bags.create(this.game.world.randomX, 90, 'bag');

            // Scale bags
            onebag.scale.x = 0.5;
            onebag.scale.y = 0.5;

            //  Let gravity do its thing
            onebag.body.gravity.y = 400 + Math.random() * 700;

            //  This just gives each bag a slightly random bounce value
            onebag.body.bounce.y = 0.4 + Math.random() * 0.1;
            this.score += 1;
        };
        Overworld.prototype.setXSpeed = function (emitter, max) {
            emitter.setXSpeed(max - 20, max);
            emitter.forEachAlive(this.setParticleXSpeed, this, max);
        };
        Overworld.prototype.setParticleXSpeed = function (particle, max) {
            particle.body.velocity.x = max - Math.floor(Math.random() * 30);
        };
        Overworld.prototype.generateBags = function (num) {
            for (var i = 0; i <= num; i++) {
                //  Create a bag inside of the 'bags' group
                var onebag = this.bags.create(this.game.world.randomX, 200, 'bag');
                onebag.scale.x = 0.5;
                onebag.scale.y = 0.5;

                //  Let gravity do its thing
                onebag.body.gravity.y = 400 + Math.random() * 700;

                //  This just gives each bag a slightly random bounce value
                onebag.body.bounce.y = 0.4 + Math.random() * 0.1;
            }
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

            this.state.start('Boot');
        }
        return RoxGame;
    })(Phaser.Game);
    Rox.RoxGame = RoxGame;
})(Rox || (Rox = {}));
