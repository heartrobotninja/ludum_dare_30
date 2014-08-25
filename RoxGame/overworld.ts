module Rox {
    // TODO: timer to keep track of how long it took you to complete.
    // TODO: Clever Diplay: Something like a box when you win with your time.
    // TODO: ???
    // TODO: Profit!!!1!11!
    export class Overworld extends Phaser.State {
        // Variables
        player: Phaser.Sprite;
        platforms: Phaser.Group;
        bg: Phaser.TileSprite;
        facing: String = 'left';
        music: Phaser.Sound;

        bags: Phaser.Group;
        score: number = 0;
        scoreText: Phaser.Text;

        //snow vars
        max: number = 0;
        front_emitter;
        mid_emitter;
        back_emitter;

        preload() {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
        }

        create() {
            this.bg = this.game.add.tileSprite(0, 0, 800, 600, 'sky');
            this.bg.fixedToCamera = true;

            this.music = this.game.add.audio('overworld', 1, true);
            this.music.play('', 0, 1, true);

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

            for (var i = 0; i < 8; i++) {
                //  Create a star inside of the 'bags' group
                var onebag = this.bags.create(i * 100, 200, 'bag');
                onebag.scale.x = 0.5;
                onebag.scale.y = 0.5;


                //  Let gravity do its thing
                onebag.body.gravity.y = 400 + Math.random() * 700;

                //  This just gives each star a slightly random bounce value
                onebag.body.bounce.y = 0.4 + Math.random() * 0.1;
            }
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
        }

        update() {
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
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                //  Move to the right
                this.player.body.velocity.x = 150;

                if (this.facing != 'right') {
                    this.player.animations.play('right');
                    this.facing = 'right';
                }
            }
            else {
                if (this.facing != 'idle') {
                    this.player.animations.stop();

                    if (this.facing == 'left') {
                        this.player.frame = 6;
                    }
                    else {
                        this.player.frame = 7;
                    }

                    this.facing = 'idle';
                }
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.player.body.touching.down) {
                this.player.body.velocity.y = -540;
            }
        }

        collectBags(player, star) {

            // Removes the star from the screen
            if (onebag) {
                onebag.kill();
            }
            for (var i = 0; i <= 1; i++) {
                //  Create a star inside of the 'stars' group
                var onebag = this.bags.create(this.game.world.randomX, 90, 'bag');

                // Scale bags
                onebag.scale.x = 0.5;
                onebag.scale.y = 0.5;


                //  Let gravity do its thing
                onebag.body.gravity.y = 400 + Math.random() * 700;

                //  This just gives each star a slightly random bounce value
                onebag.body.bounce.y = 0.4 + Math.random() * 0.1;

            }
            if (this.score === 100) {
                this.scoreText = this.game.add.text(400, 300, 'YOU WIN!!!', { fontSize: '60px', fill: '#000' });
                this.game.state.game.paused = true;
            }
            else {
                this.score += 1;
                this.scoreText.text = 'score: ' + this.score;
            }
        }
        setXSpeed(emitter, max) {
            emitter.setXSpeed(max - 20, max);
            emitter.forEachAlive(this.setParticleXSpeed, this, max);
        }
        setParticleXSpeed(particle, max) {
            particle.body.velocity.x = max - Math.floor(Math.random() * 30);
        }
    }
} 