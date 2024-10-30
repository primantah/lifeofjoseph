class Act1Scene7 extends Phaser.Scene {
    constructor() {
        super({ key: 'Act1Scene7' });
    }

    preload() {
        // Load assets for the scene
        this.load.image('potiphar_background', 'assets/images/potiphar_background.png');
        this.load.image('joseph', 'assets/images/joseph.png');
        this.load.image('trash', 'assets/images/trash.png');
        this.load.audio('ambient_sound', 'assets/audio/ambient_sound.mp3');  // Background ambient sound
    }

    create() {
        this.setupScene();
        this.setupControls();
    }

    setupScene() {
        // Set up the Potiphar's house background
        this.background = this.add.image(0, 0, 'potiphar_background').setOrigin(0, 0);
        this.background.displayWidth = this.sys.game.config.width;
        this.background.displayHeight = this.sys.game.config.height;

        // Add Joseph to the scene
        this.joseph = this.physics.add.sprite(200, 400, 'joseph').setScale(0.1);
        this.joseph.setCollideWorldBounds(true);

        // Add trash piles as static objects
        this.trash1 = this.physics.add.staticSprite(150, 300, 'trash').setScale(0.1);
        this.trash2 = this.physics.add.staticSprite(400, 350, 'trash').setScale(0.1);
        this.trash3 = this.physics.add.staticSprite(550, 300, 'trash').setScale(0.1);
        this.trashPiles = [this.trash1, this.trash2, this.trash3];

        // Play ambient background sound for the scene
        this.ambientSound = this.sound.add('ambient_sound');
        this.ambientSound.play({ loop: true, volume: 0.2 });

        // Instruction text for cleaning trash
        this.add.text(100, 50, 'Move Joseph with arrow keys. Press E to clean trash.', {
            font: '16px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        });

        // Placeholder for sequential text messages
        this.messageText = this.add.text(100, 100, '', {
            font: '18px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3,
            wordWrap: { width: 500 }
        });

        // Track cleaned count
        this.cleanedCount = 0;
    }

    setupControls() {
        // Arrow key controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // E key for cleaning
        this.cleanKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    update() {
        // Reset velocity to prevent sliding
        this.joseph.setVelocity(0);

        // Handle movement
        if (this.cursors.left.isDown) {
            this.joseph.setVelocityX(-150);
        } else if (this.cursors.right.isDown) {
            this.joseph.setVelocityX(150);
        }
        if (this.cursors.up.isDown) {
            this.joseph.setVelocityY(-150);
        } else if (this.cursors.down.isDown) {
            this.joseph.setVelocityY(150);
        }

        // Check each trash pile for proximity and cleaning action
        this.trashPiles.forEach((trash, index) => {
            if (trash.visible && Phaser.Math.Distance.Between(this.joseph.x, this.joseph.y, trash.x, trash.y) < 50) {
                if (Phaser.Input.Keyboard.JustDown(this.cleanKey)) {
                    this.cleanTrash(trash, index);
                }
            }
        });
    }

    cleanTrash(trash, index) {
        // Hide the trash pile
        trash.setVisible(false);

        // Messages to display as Joseph cleans each trash pile
        const messages = [
            "Joseph now is a slave of Potiphar's",
            "But he believes God has prepared him for something greater",
            "Now he must do his duty as best he can. He knows that those faithful in small matters will be given responsibility in greater matters."
        ];

        // Append each message, retaining previous messages
        this.messageText.setText(this.messageText.text + "\n" + messages[this.cleanedCount]);

        // Increment cleaned count
        this.cleanedCount += 1;

        // Check if all trash has been cleaned
        if (this.cleanedCount === this.trashPiles.length) {
            this.transitionToNextScene();
        }
    }

    transitionToNextScene() {
        // Transition to the next scene after a delay
        this.time.delayedCall(12000, () => {
            this.ambientSound.stop();
            this.scene.start('Act1Scene8');  // Move to the next scene
        });
    }
}

export default Act1Scene7;
