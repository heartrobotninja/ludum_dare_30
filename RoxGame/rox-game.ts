module Rox {
    export class RoxGame extends Phaser.Game {

        constructor() {
            super(800, 600, Phaser.AUTO, 'container', null);

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('Overworld', Overworld, false);
            //this.state.add('BagWorld', BagWorld, false);

            this.state.start('Boot');
        }
    }
}