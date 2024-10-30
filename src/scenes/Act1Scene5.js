class Act1Scene5 extends Phaser.Scene {
    constructor() {
        super({ key: 'Act1Scene5' });
    }

    preload() {
        // Load assets for the scene, including characters and background
        this.load.image('well_background', 'assets/images/well_background.png');
        this.load.image('joseph', 'assets/images/joseph.png');
        this.load.image('brother', 'assets/images/brother.png');
        this.load.image('slave_buyer', 'assets/images/slave_buyer.png');
        this.load.audio('cry', 'assets/audio/cry.mp3');
    }

    create() {
        this.setupScene();
        this.startCutsceneSequence();
    }

    setupScene() {
        // Set up the well background
        this.background = this.add.image(0, 0, 'well_background').setOrigin(0, 0);
        this.background.displayWidth = this.sys.game.config.width;
        this.background.displayHeight = this.sys.game.config.height;

        // Add characters with starting positions
        this.joseph = this.physics.add.sprite(300, 300, 'joseph').setScale(0.1);
        // this.joseph.setTint(0x666666); // Muted colors for somber effect
        this.joseph.setCollideWorldBounds(true);

        this.brother = this.physics.add.sprite(100, 300, 'brother').setScale(1);
        this.slaveBuyer = this.add.sprite(700, 400, 'slave_buyer').setScale(0.15);

        // Play somber background music
        this.music = this.sound.add('cry');
        this.music.play({ loop: true, volume: 0.3 });
    }

    startCutsceneSequence() {
        // Start the sequence: slave buyer arrives
        this.buyerArrives();
    }

    buyerArrives() {
        // Slave buyer approaches Joseph
        this.tweens.add({
            targets: this.slaveBuyer,
            x: 500,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => this.brotherPullsJoseph()
        });

        // Initial text about the slave buyer's arrival
        this.add.text(200, 100, 'The slave buyer arrives...', {
            font: '20px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        });
    }

    brotherPullsJoseph() {
        // Display text about the brother pulling Joseph from the well
        this.add.text(200, 150, 'The brother pulls Joseph out of the well...', {
            font: '20px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        });

        // Brother pulls Joseph up
        this.tweens.add({
            targets: this.joseph,
            y: 400,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => this.sellJoseph()
        });
    }

    sellJoseph() {
        // Display text about selling Joseph
        this.add.text(200, 200, "The brother sells Joseph to the slave owner...", {
            font: '20px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        });

        // Proceed to Joseph's plea after a delay
        this.time.delayedCall(1000, () => {
            this.josephPlea();
        });
    }

    josephPlea() {
        // Show Joseph's cry for help
        this.add.text(200, 250, "Joseph: 'Please, brother, don't sell me as a slave. It's the worst fate I can ever imagine.'", {
            font: '18px Arial',
            fill: '#ff0000',
            stroke: '#000000',
            strokeThickness: 3,
            wordWrap: { width: 500 }
        });

        // Delay and then show the brothers ignoring him
        this.time.delayedCall(3000, () => {
            this.ignoreJoseph();
        });
    }

    ignoreJoseph() {
        // Show message indicating the brothers ignored Joseph
        this.add.text(200, 300, "But the brothers ignore Joseph's pleas...", {
            font: '20px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        });

        // Delay and then make Joseph walk toward the slave buyer
        this.time.delayedCall(2000, () => {
            this.walkToSlaveBuyer();
        });
    }

    walkToSlaveBuyer() {
        // Joseph walks slowly towards the slave buyer, symbolizing loss of freedom
        this.tweens.add({
            targets: this.joseph,
            x: this.slaveBuyer.x - 50,
            duration: 3000,
            ease: 'Power2',
            onComplete: () => this.transitionToNextScene()
        });
    }

    transitionToNextScene() {
        // Fade out and transition to the next scene after a brief delay
        this.add.text(200, 350, "Joseph is taken away by the slave buyer...", {
            font: '20px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        });

        this.time.delayedCall(2000, () => {
            this.music.stop();
            this.scene.start('Act1Scene6');  // Move to the next scene
        });
    }
}

export default Act1Scene5;
