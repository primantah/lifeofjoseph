class Act1Scene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Act1Scene2' });
    }

    preload() {
        // Load assets for the background, NPCs, and obstacles
        this.load.image('journey_background', 'assets/images/journey_background.png');
        this.load.image('joseph', 'assets/images/joseph.png');
        this.load.image('npc', 'assets/images/npc.png');  // NPC character
        this.load.image('snake', 'assets/images/snake.png');  // Danger
        this.load.image('sheep', 'assets/images/sheep.png');  // Target object
    }

    create() {
        // Set up the background
        this.journey_background = this.add.image(0, 0, 'journey_background').setOrigin(0, 0);
        this.journey_background.displayWidth = this.sys.game.config.width;
        this.journey_background.displayHeight = this.sys.game.config.height;

        // Set up Joseph's character
        this.joseph = this.physics.add.sprite(190, 60, 'joseph');
        this.joseph.setScale(0.1);
        this.joseph.setCollideWorldBounds(true);

        // Set up NPCs and add greetings
        this.npc1 = this.add.sprite(220, 140, 'npc').setScale(0.11);
        this.npc2 = this.add.sprite(300, 300, 'npc').setScale(0.11);
        this.npcs = [this.npc1, this.npc2];

        // Set up simple obstacles
        this.snake = this.physics.add.staticSprite(110, 300, 'snake').setScale(1);

        // Set up the target object to reach the brother
        this.sheep = this.physics.add.staticSprite(300, 570, 'sheep').setScale(1);

        // Interaction text
        // Interaction text with white fill and black stroke
        this.interactionText = this.add.text(50, 50, '', { 
            font: '16px Arial', 
            fill: '#ffffff',
            stroke: '#000000',     // Set stroke color to black
            strokeThickness: 3     // Set stroke thickness
        });

        // Poison text with red fill and black stroke
        this.poisonText = this.add.text(200, 100, '', { 
            font: '20px Arial', 
            fill: '#ff0000',
            stroke: '#000000',     // Set stroke color to black
            strokeThickness: 4     // Set stroke thickness
        });
        
        // Success message text for reaching the brother
        this.successText = this.add.text(200, 100, '', { 
            font: '20px Arial', 
            fill: '#00ff00',
            stroke: '#000000',     
            strokeThickness: 4     
        });

        // Input keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // Darken background as Joseph moves right
        this.colorOverlay = this.add.rectangle(0, 0, this.sys.game.config.width, this.sys.game.config.height, 0x000000, 0);
        this.colorOverlay.setOrigin(0, 0);

        // Enable collision detection between Joseph and the snake
        this.physics.add.overlap(this.joseph, this.snake, this.handleSnakeCollision, null, this);
        this.physics.add.overlap(this.joseph, this.sheep, this.reachSheep, null, this);
    }

    update() {
        // Reset Joseph's velocity
        this.joseph.setVelocity(0);

        // Handle movement
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

        // Check for NPC interaction
        this.npcs.forEach((npc, index) => {
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.joseph.getBounds(), npc.getBounds())) {
                this.interactionText.setText(`NPC ${index + 1}: "Hello, Joseph!"`);
            }
        });

        // Gradual color shift effect
        const transitionPoint = this.sys.game.config.width / 2;
        if (this.joseph.x > transitionPoint) {
            this.colorOverlay.alpha = (this.joseph.x - transitionPoint) / transitionPoint;
        }
    }
    
    handleSnakeCollision() {
        // Show "poisoned" message
        this.poisonText.setText("Joseph poisoned by a snake");

        // Reset Joseph's position after a short delay
        this.time.delayedCall(2000, () => {
            this.joseph.setPosition(190, 60);  // Return Joseph to starting position
            this.poisonText.setText('');  // Clear the message
        });
    }

    reachSheep() {
        // Show "reached brother" message
        this.successText.setText("Joseph reached his brother");
        //this.music.stop();  // Stop the music correctly
        // Transition to Act1Scene3 after a short delay
        this.time.delayedCall(2000, () => {
            this.scene.start('Act1Scene3');
        });
    }

}

export default Act1Scene2;