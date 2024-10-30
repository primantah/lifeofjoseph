class Act1Scene6 extends Phaser.Scene {
    constructor() {
        super({ key: 'Act1Scene6' });
    }

    preload() {
        // Load assets for the scene
        this.load.image('desert_background', 'assets/images/desert_background.png');
        this.load.image('joseph', 'assets/images/joseph.png');
        this.load.image('slave_buyer', 'assets/images/slave_buyer.png');
        this.load.audio('prayer', 'assets/audio/prayer.mp3');  // Joseph's prayer sound effect
    }

    create() {
        this.setupScene();
        this.setupPrayerMechanic();
        this.startJourney();
    }

    setupScene() {
        // Set up the desert background
        this.background = this.add.image(0, 0, 'desert_background').setOrigin(0, 0);
        this.background.displayWidth = this.sys.game.config.width;
        this.background.displayHeight = this.sys.game.config.height;

        // Add Joseph and the slave owner with starting positions
        this.joseph = this.physics.add.sprite(200, 400, 'joseph').setScale(0.1);
        this.joseph.setCollideWorldBounds(true);

        this.slaveBuyer = this.physics.add.sprite(100, 400, 'slave_buyer').setScale(0.15);
        this.slaveBuyer.setFlipX(true);  // Flip the slave buyer horizontally

        // Instruction text for praying
        this.instructionText = this.add.text(100, 50, 'Press P to pray and strengthen Joseph’s faith.', {
            font: '16px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        });

        // Track Joseph's faith level
        this.faithLevel = 0;
    }

    setupPrayerMechanic() {
        // Prayer sound effect
        this.prayerSound = this.sound.add('prayer', { volume: 0.5 });

        // Prayer input key
        this.prayerKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        // Glow effect for prayer (will adjust opacity to simulate glow)
        this.glow = this.add.circle(this.joseph.x, this.joseph.y, 40, 0xffff66, 0).setVisible(false);
    }

    startJourney() {
        // Make the slave owner and Joseph walk across the desert
        this.tweens.add({
            targets: [this.slaveBuyer, this.joseph],
            x: 700,  // Move them to the other side of the screen
            duration: 8000,
            ease: 'Linear',
            onComplete: () => this.reachEgypt()
        });
    }

    update() {
        // Check if the prayer key is pressed to trigger Joseph's prayer
        if (Phaser.Input.Keyboard.JustDown(this.prayerKey)) {
            this.triggerPrayer();
        }

        // Keep the glow effect in sync with Joseph's position
        this.glow.setPosition(this.joseph.x, this.joseph.y);
    }

    triggerPrayer() {
        // Play the prayer sound
        this.prayerSound.play();

        // Increase Joseph's faith level
        this.faithLevel += 1;

        // Display a glow effect around Joseph to symbolize "increase in faith"
        this.glow.setVisible(true);
        this.tweens.add({
            targets: this.glow,
            alpha: { from: 0.5, to: 0 },  // Fade glow in and out
            scale: { from: 1, to: 1.5 },
            duration: 1000,
            onComplete: () => {
                this.glow.setVisible(false);
            }
        });

        // Display faith increase message briefly
        const faithText = this.add.text(this.joseph.x, this.joseph.y - 50, '+Faith', {
            font: '18px Arial',
            fill: '#ffff66',
            stroke: '#000000',
            strokeThickness: 2
        });
        this.time.delayedCall(1000, () => faithText.destroy());  // Remove text after 1 second
    }

    reachEgypt() {
        // Display final message when Joseph reaches Egypt
        this.add.text(200, 350, "Joseph has arrived in Egypt, bound yet resilient in his faith.", {
            font: '20px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
            wordWrap: { width: 250 }
        });

        // Stop all sounds before transitioning to the next scene
        this.time.delayedCall(3000, () => {
            this.sound.stopAll();  // Stop all music and sounds
            this.scene.start('Act1Scene7');  // Move to the next scene
        });
    }
}

export default Act1Scene6;
