import { Scene, Input } from 'phaser';

            export class Game extends Scene
            {
                camera: Phaser.Cameras.Scene2D.Camera;
                background: Phaser.GameObjects.Image;
                spaceship: Phaser.Physics.Arcade.Sprite; // Use Phaser.Physics.Arcade.Sprite for the spaceship
                cursors: Input.Keyboard.CursorKeys; // Declare cursors
                celestialObjects: Phaser.Physics.Arcade.Group; // Declare the celestial objects group
                objectSpawnTimer: Phaser.Time.TimerEvent; // Timer to spawn celestial objects

                constructor ()
                {
                    super('Game');
                }

                create ()
                {
                    this.camera = this.cameras.main;
                    this.camera.setBackgroundColor(0x00ff00);

                    this.background = this.add.image(512, 384, 'background');
                    this.background.setAlpha(0.5);

                    this.spaceship = this.physics.add.sprite(512, 600, 'spaceship'); // Add the spaceship with physics
                    // this.spaceship.setScale(0.5); // Adjust the size of the spaceship
                    this.spaceship.setCollideWorldBounds(true); // Prevent the spaceship from going out of bounds

                    this.cursors = this.input.keyboard.createCursorKeys(); // Create cursor keys

                    this.celestialObjects = this.physics.add.group(); // Create the celestial objects group

                    this.objectSpawnTimer = this.time.addEvent({
                        delay: 1000, // Spawn a celestial object every second
                        callback: this.spawnCelestialObject,
                        callbackScope: this,
                        loop: true
                    });

                    this.physics.add.overlap(this.spaceship, this.celestialObjects, this.handleCollision, undefined, this);

                    this.input.once('pointerdown', () => {
                        this.scene.start('GameOver');
                    });
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
                        if (object.y > 800) { // If the object goes off the screen, destroy it
                            object.destroy();
                        }
                    });
                }

                spawnCelestialObject ()
                {
                    const x = Phaser.Math.Between(0, 1024); // Random x position
                    const type = Phaser.Math.Between(0, 5); // Random type of celestial object

                    let object: Phaser.Physics.Arcade.Sprite;

                    switch (type) {
                        case 0: // Black Hole
                            object = this.celestialObjects.create(x, 0, 'blackHole', 0);
                            object.setScale(1);
                            break;
                        case 1: // Moons
                            object = this.celestialObjects.create(x, 0, 'moons', Phaser.Math.Between(0, 3));
                            object.setScale(1);
                            break;
                        case 2: // Dwarf Stars
                            object = this.celestialObjects.create(x, 0, 'dwarfStars', Phaser.Math.Between(0, 3));
                            object.setScale(1);
                            break;
                        case 3: // Asteroids
                            object = this.celestialObjects.create(x, 0, 'asteroids', Phaser.Math.Between(0, 3));
                            object.setScale(1);
                            break;
                        case 4: // Star Clusters
                            object = this.celestialObjects.create(x, 0, 'starClusters', Phaser.Math.Between(0, 2));
                            object.setScale(1);
                            break;
                        case 5: // Nebulae
                            object = this.celestialObjects.create(x, 0, 'nebulae', Phaser.Math.Between(0, 1));
                            object.setScale(1);
                            break;
                    }

                    object.setVelocityY(200); // Set the object to move down
                }

                handleCollision ()
                {
                    console.log('collision');
                    this.scene.start('GameOver'); // Restart the game if a collision occurs
                }
            }
