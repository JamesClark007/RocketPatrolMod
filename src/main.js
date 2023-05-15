// James Clark
// Rocket Patrol
// 12 hours

// Implement a new timing/scoring mechanism that adds time to the clock for successful hits (15)
// Create 4 new explosion sound effects and randomize which one plays on impact (10)
// Track a high score that persists across scenes and display it in the UI (5)
// Allow the player to control the Rocket after it's fired (5)
// Create a new scrolling tile sprite for the background (5)

// Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
// -hit box is a little bit off but still works 

// Create a new title screen (e.g., new artwork, typography, layout) (10)
// Implement the 'FIRE' UI text from the original game (5)

// Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
// -music is very quiet

// Implement mouse control for player movement and mouse click to fire (15) 
// -you can use the keys or mouse, both work.

// Implement the speed increase that happens after 30 seconds in the original game (5)

// Randomize each spaceship's movement direction at the start of each play (5)
// -the ship move randomly in a verticle direction kind od floating thru the map









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