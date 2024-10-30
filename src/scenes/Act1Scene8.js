class Act1Scene8 extends Phaser.Scene {
    constructor() {
        super({ key: 'Act1Scene8' });
    }

    preload() {
        // No additional assets are needed for this scene.
    }

    create() {
        // Set the background color to black
        this.cameras.main.setBackgroundColor('#000000');

        // Display "TO BE CONTINUED" and support message
        this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 100, "TO BE CONTINUED", {
            font: '48px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 20, "PLEASE SUPPORT US", {
            font: '36px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 30, "primanta.b@gmail.com", {
            font: '24px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        // Display prompt to restart or terminate
        this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 100, "Do you want to restart from beginning? Press Y or N", {
            font: '20px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            wordWrap: { width: 600 }
        }).setOrigin(0.5);

        // Set up input for Y (restart) or N (terminate)
        this.yKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
        this.nKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
    }

    update() {
        // Restart the game if Y is pressed
        if (Phaser.Input.Keyboard.JustDown(this.yKey)) {
            this.scene.start('Act1Scene0');  // Restart from the beginning
        }

        // Terminate the game if N is pressed
        if (Phaser.Input.Keyboard.JustDown(this.nKey)) {
            this.game.destroy(true);  // End the game and release resources
        }
    }
}

export default Act1Scene8;
