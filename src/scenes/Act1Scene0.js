class Act1Scene0 extends Phaser.Scene {
    constructor() {
        super({ key: 'Act1Scene0' });
    }

    preload() {
        // Load the background music
        this.load.audio('calm_music', 'assets/audio/calm_music.mp3');
    }

    create() {
        // Set the background color to black
        this.cameras.main.setBackgroundColor('#000000');

        // Play calm background music
        this.music = this.sound.add('calm_music');
        this.music.play({ loop: true, volume: 0.5 });

        // Display game title and creator's name
        this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 100, "LIFE OF JOSEPH", {
            font: '48px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "created by primanta", {
            font: '24px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        // Display prompt to begin
        this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 100, "Press Y to begin", {
            font: '20px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        // Set up input for Y to start the game
        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
    }

    update() {
        // Begin the game if Y is pressed
        if (Phaser.Input.Keyboard.JustDown(this.startKey)) {
            this.music.stop();  // Stop the music correctly
            this.scene.start('Act1Scene1');  // Move to the first gameplay scene
        }
    }
}

export default Act1Scene0;