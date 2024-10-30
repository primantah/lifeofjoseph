//import Phaser from 'phaser';
import Act1Scene0 from './scenes/Act1Scene0.js';
import Act1Scene1 from './scenes/Act1Scene1.js';
import Act1Scene2 from './scenes/Act1Scene2.js';
import Act1Scene3 from './scenes/Act1Scene3.js';
import Act1Scene4 from './scenes/Act1Scene4.js';
import Act1Scene5 from './scenes/Act1Scene5.js';
import Act1Scene6 from './scenes/Act1Scene6.js';
import Act1Scene7 from './scenes/Act1Scene7.js';
import Act1Scene8 from './scenes/Act1Scene8.js';

const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    //scene: [Act1Scene1, Act1Scene2, Act1Scene3, Act1Scene4],  // Add Act1Scene2 to the list

    scene: [Act1Scene0, Act1Scene1, Act1Scene2, Act1Scene3, Act1Scene4, Act1Scene5, Act1Scene6, Act1Scene7, Act1Scene8],  // Add Act1Scene2 to the list

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
