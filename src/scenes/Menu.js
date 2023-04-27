class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');


        this.load.audio('sfx_explosion0', './assets/explosion38.wav');
        //new

        this.load.audio('sfx_explosion1', './assets/mixkit-alien-blast-in-the-earth-2546.wav');
        this.load.audio('sfx_explosion2', './assets/mixkit-arcade-game-explosion-1699.wav');
        this.load.audio('sfx_explosion3', './assets/mixkit-arcade-game-explosion-2759.wav');
        this.load.audio('sfx_explosion4', './assets/mixkit-fast-game-explosion-1688.wav');
      }
    
    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

      this.add.text(game.config.width/2, game.config.height/2 - borderUISize
      - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);

      this.add.text(game.config.width/2, game.config.height/2,
       'Use <- -> arrows to move & (F) to fire', menuConfig).setOrigin(.5);
       menuConfig.backgroundColor = '#00FF00';
       menuConfig.color = '#000';

       this.add.text(game.config.width/2, game.config.height/2 + borderPadding + borderUISize,
        'Press <- for Novice or -> for Expert', menuConfig).setOrigin(.5);
        
       // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    //   this.scene.start("playScene");
      
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
      }
      


  }
  