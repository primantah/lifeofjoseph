class Act1Scene3 extends Phaser.Scene {
    constructor() {
        super({ key: 'Act1Scene3' });
    }

    preload() {
        // Load assets for the field, brothers, and Joseph
        this.load.image('field_background', 'assets/images/field_background.png');
        this.load.image('joseph', 'assets/images/joseph.png');
        this.load.image('brother', 'assets/images/brother.png');
        this.load.audio('tense_music', 'assets/audio/tense_music.mp3');
    }

    create() {
        this.setupScene();
        this.setupQTE();
    }

    setupScene() {
        // Set up the field background
        this.fieldBackground = this.add.image(0, 0, 'field_background').setOrigin(0, 0);
        this.fieldBackground.displayWidth = this.sys.game.config.width;
        this.fieldBackground.displayHeight = this.sys.game.config.height;

        // Add Joseph character
        this.joseph = this.physics.add.sprite(300, 500, 'joseph').setScale(0.1);
        this.joseph.setCollideWorldBounds(true);  // Ensure Joseph doesn't leave the screen

        // Add brother character
        this.brother = this.physics.add.sprite(100, 300, 'brother').setScale(1);

        // Tense background music
        
        //this.music.stop();  // Stop the music correctly
        this.music = this.sound.add('tense_music');
        this.music.play({ loop: true, volume: 0.5 });

        // Darkened overlay
        this.darkOverlay = this.add.rectangle(0, 0, this.sys.game.config.width, this.sys.game.config.height, 0x000000, 0.5).setOrigin(0, 0);

        // Instruction text for the chase
        this.instructionText = this.add.text(200, 100, 'Run! The brother is chasing you!', {
            font: '20px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        });

        // Set up keyboard input for movement
        this.cursors = this.input.keyboard.createCursorKeys();

        // Enable collision between Joseph and the brother to trigger QTE
        this.physics.add.overlap(this.joseph, this.brother, this.startQTE, null, this);
    }

    setupQTE() {
        // QTE keys
        this.qteKeys = this.input.keyboard.addKeys({
            Q: Phaser.Input.Keyboard.KeyCodes.Q,
            W: Phaser.Input.Keyboard.KeyCodes.W,
            E: Phaser.Input.Keyboard.KeyCodes.E
        });

        this.qteInstructions = this.add.text(200, 400, '', {
            font: '18px Arial',
            fill: '#ff0000'
        });

        // Track QTE progress
        this.qteCount = 0;
        this.qteNeeded = 5; // Number of successful key presses before capture
        this.qteActive = false;
    }

    update() {
        // Define Joseph's speed and the brother's speed
        const josephSpeed = 150; // Joseph's speed
        const brotherSpeed = 152; // Brother's faster speed
    
        // If QTE is not active, control Joseph's movement
        if (!this.qteActive) {
            // Reset Joseph's velocity
            this.joseph.setVelocity(0);
    
            // Handle Joseph's movement
            if (this.cursors.left.isDown) {
                this.joseph.setVelocityX(-josephSpeed);
            } else if (this.cursors.right.isDown) {
                this.joseph.setVelocityX(josephSpeed);
            }
            if (this.cursors.up.isDown) {
                this.joseph.setVelocityY(-josephSpeed);
            } else if (this.cursors.down.isDown) {
                this.joseph.setVelocityY(josephSpeed);
            }
    
            // Make the brother chase Joseph with a higher speed
            this.physics.moveToObject(this.brother, this.joseph, brotherSpeed);
        }
    }

    startQTE() {
        // Stop the chase and initiate the QTE
        this.qteActive = true;
        this.joseph.setVelocity(0);
        this.brother.setVelocity(0);

        // Display QTE instructions
        this.qteInstructions.setText("Press Q, W, E rapidly to struggle!");

        // Listen for QTE key events
        this.input.keyboard.on('keydown', this.handleQTEInput, this);
    }

    handleQTEInput(event) {
        // Check if the QTE keys are pressed
        if (this.qteActive && this.qteKeys[event.key.toUpperCase()]) {
            this.qteCount++;
            if (this.qteCount >= this.qteNeeded) {
                this.finishQTE();  // Joseph is ultimately captured
            }
        }
    }

    finishQTE() {
        this.qteActive = false;
        this.qteInstructions.setText('');

        // Display capture sequence
        this.instructionText.setText("The brother captured and overpowered Joseph...");
        this.time.delayedCall(2000, () => this.throwJosephIntoWell(), null, this);
    }

    throwJosephIntoWell() {
        // Darken the screen more and play throw-in animation
        this.darkOverlay.setAlpha(0.7);
        this.joseph.setTint(0x333333);

        this.instructionText.setText("They strip Joseph of his coat and throw him into the well.");
        this.music.stop()
        // Fade out and transition after a delay
        this.time.delayedCall(3000, () => {
            this.music.stop();
            this.scene.start('Act1Scene4');  // Transition to the next scene
        });
    }
}

export default Act1Scene3;