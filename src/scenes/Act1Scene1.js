class Act1Scene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Act1Scene1' });
        console.log("Act1Scene1 loaded");  // Debugging line
    }

    preload() {
        // Load assets
        this.load.image('background', 'assets/images/home_background.png');  // Adjust paths as needed
        this.load.image('joseph', 'assets/images/joseph.png');
        this.load.image('basket', 'assets/images/basket.png');
        this.load.audio('calm_music', 'assets/audio/calm_music.mp3');  // Load background music
    }
    
    create() {
        // Add a full-screen background
        const background = this.add.image(0, 0, 'background');
        background.setOrigin(0, 0);
        background.displayWidth = this.sys.game.config.width;
        background.displayHeight = this.sys.game.config.height;
        
        this.add.text(100, 100, 'The Life of Joseph', { font: '24px Arial', fill: '#fff' });
        
        // Add Joseph character
        this.joseph = this.physics.add.sprite(500, 500, 'joseph');
        this.joseph.setScale(0.1);

        // Add basket of food as an interactive object
        this.basket = this.physics.add.staticSprite(270, 390, 'basket'); // location of basket
        this.basket.setScale(0.1);
        this.basket.setInteractive();

        // Display instructional text
        this.add.text(50, 50, "Move Joseph to the basket and press 'E' to collect it", {
            font: '16px Arial',
            fill: '#ffffff'
        });

        // Play calm background music
        this.music = this.sound.add('calm_music');
        this.music.play({ loop: true, volume: 0.5 });

        // Input keys
        this.cursors = this.input.keyboard.createCursorKeys();
        this.collectKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // Track if the basket is collected
        this.basketCollected = false;
    }

    update() {
        // Reset velocity to prevent sliding
        this.joseph.setVelocity(0);

        // Movement controls
        if (this.cursors.left.isDown) {
            this.joseph.setVelocityX(-100);
        } else if (this.cursors.right.isDown) {
            this.joseph.setVelocityX(100);
        }
        if (this.cursors.up.isDown) {
            this.joseph.setVelocityY(-100);
        } else if (this.cursors.down.isDown) {
            this.joseph.setVelocityY(100);
        }

        // Check for basket collection
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.joseph.getBounds(), this.basket.getBounds()) && !this.basketCollected) {
            if (this.collectKey.isDown) {
                this.collectBasket();
            }
        }
    }

    collectBasket() {
        // Hide the basket and set the flag
        this.basket.disableBody(true, true);
        this.basketCollected = true;

        // Show a message indicating the basket is collected
        this.add.text(200, 150, "You collected the basket of food!", {
            font: '20px Arial',
            fill: '#ffffff'
        });

        // Stop the music if it’s playing
        if (this.music) {
            this.music.stop();
        }

        // Delay before transitioning to the next scene
        this.time.delayedCall(2000, () => {
            this.scene.start('Act1Scene2');  // Transition to Act1Scene2 after 2 seconds
        });
    }
}

export default Act1Scene1;