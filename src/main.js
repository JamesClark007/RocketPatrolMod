// James Clark
// Rocket Patrol
// 12 hours
// Implement a new timing/scoring mechanism that adds time to the clock for successful hits (15)
// Create 4 new explosion sound effects and randomize which one plays on impact (10)
// Track a high score that persists across scenes and display it in the UI (5)
// Allow the player to control the Rocket after it's fired (5)


let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ],
    callbacks: {
      postBoot: function (game) {
          game.registry.set('highScoreManager', highScoreManager);
        }
    }
  }
  
let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;