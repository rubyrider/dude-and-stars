import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');

        this.load.image('spaceship', 'dino.gif'); // Load the spaceship image

        this.load.image('rock', 'rock.png'); // Load the rock image

        this.load.spritesheet('moons', 'CelestialObjects.png', { frameWidth: 32, frameHeight: 32, startFrame: 12 }); // Load the moons spritesheet
        this.load.spritesheet('dwarfStars', 'CelestialObjects.png', { frameWidth: 32, frameHeight: 32, startFrame: 16 }); // Load the dwarf stars spritesheet
        this.load.spritesheet('asteroids', 'CelestialObjects.png', { frameWidth: 64, frameHeight: 64, startFrame: 20 }); // Load the asteroids spritesheet
        this.load.spritesheet('starClusters', 'CelestialObjects.png', { frameWidth: 64, frameHeight: 64, startFrame: 24 }); // Load the star clusters spritesheet
        this.load.spritesheet('nebulae', 'CelestialObjects.png', { frameWidth: 64, frameHeight: 64, startFrame: 27 }); // Load the nebulae spritesheet
        this.load.spritesheet('blackHole', 'CelestialObjects.png', { frameWidth: 64, frameHeight: 64, startFrame: 29 }); // Load the black hole spritesheet

    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
