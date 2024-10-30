class Act1Scene4 extends Phaser.Scene {
    constructor() {
        super({ key: 'Act1Scene4' });
    }

    preload() {
        // Load assets for the well, Joseph, and cry sound effect
        this.load.image('well_background', 'assets/images/well_background.png');
        this.load.image('joseph', 'assets/images/joseph.png');
        this.load.audio('cry', 'assets/audio/cry.mp3');  // Cry for help
    }

    create() {
        this.setupScene();
        this.setupHelpMechanic();
    }

    setupScene() {
        // Set up the confined well background
        this.wellBackground = this.add.image(0, 0, 'well_background').setOrigin(0, 0);
        this.wellBackground.displayWidth = this.sys.game.config.width;
        this.wellBackground.displayHeight = this.sys.game.config.height;

        // Add Joseph character in the middle of the well
        this.joseph = this.physics.add.sprite(300, 300, 'joseph').setScale(0.1);
        this.joseph.setCollideWorldBounds(true); // Keep Joseph inside the well bounds

        // Set up dim lighting overlay
        this.darkOverlay = this.add.rectangle(0, 0, this.sys.game.config.width, this.sys.game.config.height, 0x000000, 0.6).setOrigin(0, 0);

        // Instruction text for calling for help
        this.instructionText = this.add.text(100, 50, 'Press H to call for help...', {
            font: '18px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        });

        // Despair message that appears after calling for help
        this.despairText = this.add.text(150, 400, '', {
            font: '20px Arial',
            fill: '#ff0000',
            stroke: '#000000',
            strokeThickness: 4
        });
        this.despairText.setAlpha(0);  // Start with text invisible for fade-in effect
    }

    setupHelpMechanic() {
        // Load cry sound with echo effect
        this.crySound = this.sound.add('cry', {
            volume: 0.5,
            rate: 1,
            loop: false
        });

        // Input key for calling out for help
        this.helpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

        // Track whether Joseph has already called for help
        this.calledForHelp = false;
    }

    update() {
        // Call for help when pressing "H"
        if (Phaser.Input.Keyboard.JustDown(this.helpKey) && !this.calledForHelp) {
            this.calledForHelp = true;  // Set to true to prevent multiple calls
            this.cryForHelp();
        }
    }

    cryForHelp() {
        // Play the cry sound with echo effect
        this.crySound.play();
        
        // Show despair message with fade-in effect
        this.time.delayedCall(1000, () => {
            this.despairText.setText("Joseph's brothers ignore his cries...");
            this.tweens.add({
                targets: this.despairText,
                alpha: 1,  // Fade in text
                duration: 1000,
                ease: 'Power2'
            });
        });

        // Transition to the next scene after a delay (optional)
        this.time.delayedCall(5000, () => {
            this.scene.start('Act1Scene5');  // Move to the next scene
        });
    }
}

export default Act1Scene4;
