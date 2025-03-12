import { Scene } from 'phaser';

export class GameOver extends Scene
{
    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        // Set background
        this.cameras.main.setBackgroundColor(0x000000);
        
        // Get scores from localStorage
        const lastScore = localStorage.getItem('lastScore') || '0';
        const highScore = localStorage.getItem('highScore') || '0';
        
        // Display game over text
        this.add.text(512, 200, 'GAME OVER', {
            fontFamily: 'Arial Black',
            fontSize: '64px',
            color: '#ff0000',
            align: 'center'
        }).setOrigin(0.5);
        
        // Display score
        this.add.text(512, 300, `Your Score: ${lastScore}`, {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        
        // Display high score
        this.add.text(512, 350, `High Score: ${highScore}`, {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffff00',
            align: 'center'
        }).setOrigin(0.5);
        
        // Restart button
        const restartButton = this.add.text(512, 450, 'Play Again', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center',
            backgroundColor: '#1a65ac',
            padding: {
                left: 15,
                right: 15,
                top: 10,
                bottom: 10
            }
        }).setOrigin(0.5);
        
        // Make the button interactive
        restartButton.setInteractive();
        
        // Add the pointerdown event to restart the game
        restartButton.on('pointerdown', () => {
            this.scene.start('Game');
        });
        
        // Main Menu button
        const menuButton = this.add.text(512, 520, 'Main Menu', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            align: 'center',
            backgroundColor: '#1a65ac',
            padding: {
                left: 15,
                right: 15,
                top: 10,
                bottom: 10
            }
        }).setOrigin(0.5);
        
        // Make the button interactive
        menuButton.setInteractive();
        
        // Add the pointerdown event to go to the main menu
        menuButton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}
