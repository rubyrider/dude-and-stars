import { Scene, Input } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    spaceship: Phaser.Physics.Arcade.Sprite; // Use Phaser.Physics.Arcade.Sprite for the spaceship
    cursors: Input.Keyboard.CursorKeys; // Declare cursors
    celestialObjects: Phaser.Physics.Arcade.Group; // Declare the celestial objects group
    objectSpawnTimer: Phaser.Time.TimerEvent; // Timer to spawn celestial objects
    speedIncreaseTimer: Phaser.Time.TimerEvent; // Timer to increase speed
    currentSpeed: number; // Variable to keep track of the current speed
    score: number;
    scoreText: Phaser.GameObjects.Text;
    msg_text : Phaser.GameObjects.Text;

    constructor ()
    {
        super('Game');
        this.currentSpeed = 200; // Initial speed
        this.score = 0; // Initialize score
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x0000ff);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.spaceship = this.physics.add.sprite(512, 600, 'spaceship'); // Add the spaceship with physics
        this.spaceship.setScale(0.05); // Adjust the size of the spaceship
        this.spaceship.setCollideWorldBounds(true); // Prevent the spaceship from going out of bounds

        this.cursors = this.input.keyboard.createCursorKeys(); // Create cursor keys

        this.celestialObjects = this.physics.add.group(); // Create the celestial objects group

        this.msg_text = this.add.text(512, 384, 'Copilot AI Challenge', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.msg_text.setOrigin(0.5);
        this.msg_text.setAlpha(0.5);

        this.objectSpawnTimer = this.time.addEvent({
            delay: 1000, // Spawn a celestial object every second
            callback: this.spawnCelestialObject,
            callbackScope: this,
            loop: true
        });

        this.speedIncreaseTimer = this.time.addEvent({
            delay: 5000, // Increase speed every 5 seconds
            callback: this.increaseSpeed,
            callbackScope: this,
            loop: true
        });

        this.physics.add.overlap(this.spaceship, this.celestialObjects, this.handleCollision, undefined, this);

        this.input.once('pointerdown', () => {
            this.scene.start('GameOver');
        });

        // Add score text
        this.scoreText = this.add.text(16, 16, 'Score: 0', { 
            fontSize: '32px', 
            color: '#fff',
            stroke: '#000',
            strokeThickness: 3
        });

        // Remove the automatic score timer since we'll increment score only when objects are destroyed
        // We don't need the scoreTimer property anymore
    }

    update ()
    {
        if (this.cursors.left.isDown)
        {
            this.spaceship.x -= 5;
        }
        else if (this.cursors.right.isDown)
        {
            this.spaceship.x += 5;
        }

        if (this.cursors.up.isDown)
        {
            this.spaceship.y -= 5;
        }
        else if (this.cursors.down.isDown)
        {
            this.spaceship.y += 5;
        }

        this.celestialObjects.children.iterate((object: Phaser.Physics.Arcade.Sprite) => {
            if (object && object.y > 800) { // If the object goes off the screen
                // Increment score based on object type before destroying it
                this.incrementScore(object.texture.key);
                object.destroy();
            }
        });
    }

    spawnCelestialObject ()
    {
        const x = Phaser.Math.Between(0, 1024); // Random x position
        const type = Phaser.Math.Between(0, 2); // Random type of celestial object

        let object: Phaser.Physics.Arcade.Sprite;

        switch (type) {
            case 0: // Object 1
                object = this.celestialObjects.create(x, 0, 'object1');
                object.setScale(0.09);
                break;
            case 1: // Object 2
                object = this.celestialObjects.create(x, 0, 'object2');
                object.setScale(0.09);
                break;
            case 2: // Object 3
                object = this.celestialObjects.create(x, 0, 'object3');
                object.setScale(0.5);
                break;
        }

        object.setVelocityY(this.currentSpeed); // Set the object to move down with the current speed
    }

    increaseSpeed ()
    {
        this.currentSpeed += 50; // Increase the speed by 50
    }

    // Modified to accept the type of object that was destroyed
    incrementScore(objectType: string) {
        let points = 0;
        
        // Assign different point values based on object type
        switch (objectType) {
            case 'object1':
                points = 5;
                break;
            case 'object2':
                points = 10;
                break;
            case 'object3':
                points = 15;
                break;
            default:
                points = 1;
        }
        
        this.score += points;
        this.scoreText.setText('Score: ' + this.score);
    }

    handleCollision ()
    {
        console.log('collision');
        
        // Store the score in localStorage to access it in the GameOver scene
        localStorage.setItem('lastScore', this.score.toString());
        
        // Update high score if current score is higher
        const highScore = localStorage.getItem('highScore') ? 
                          parseInt(localStorage.getItem('highScore')) : 0;
        
        if (this.score > highScore) {
            localStorage.setItem('highScore', this.score.toString());
        }
        
        this.scene.start('GameOver'); // Go to GameOver scene after collision
    }
}
