class Play extends Phaser.Scene {
    constructor() {
      super("playScene");

    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('SmallSpaceship', './assets/spaceship01.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});


        this.load.audio('music', './assets/music.mp3');
    }
      
    
    create() {

        this.flag = true;

        // Enable mouse input
        this.input.mouse.disableContextMenu();
        this.input.on('pointermove', (pointer) => {
            this.p1Rocket.x = Phaser.Math.Clamp(pointer.x, borderUISize + this.p1Rocket.width,
                 game.config.width - borderUISize - this.p1Rocket.width);
        });
        this.input.on('pointerdown', (pointer) => {
            if (!this.p1Rocket.isFiring) {
                this.p1Rocket.isFiring = true;
                this.p1Rocket.sfxRocket.play();
            }
        });
        // -----------------------------------------------------------------


        
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);


        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
     
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

        this.ship04 = new SmallSpaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'SmallSpaceship', 0, 40).setOrigin(0,0);
        
             // define keys

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


        this.backgroundMusic = this.sound.add('music', {
            volume: 0.1, // Set the volume (0.1 for 10% volume)
            loop: true
        });
        this.backgroundMusic.play();

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                 start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;

        const highScoreManager = this.registry.get('highScoreManager');

        // Initialize the high score if it's not already set
        if (highScoreManager.getHighScore() === 0) {
            highScoreManager.setHighScore(0);
        }



        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        };

        this.scoreLeft = this.add.text(borderUISize + borderPadding,
             borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        this.highScoreText = this.add.text(borderUISize + borderPadding + 200,
            borderUISize + borderPadding*2,
            `${highScoreManager.getHighScore()}`, scoreConfig);
        

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        

        this.remainingTime = game.settings.gameTimer;

        this.updateTimer();

        this.timeEvent = this.time.addEvent({
            delay: 1000,
            callback: this.decreaseRemainingTime,
            callbackScope: this,
            loop: true
        });
    }


    update() {
        if (this.remainingTime < 30000 && this.flag) {
            this.ship01.increaseSpeed();
            this.ship02.increaseSpeed();
            this.ship03.increaseSpeed();
            this.ship04.increaseSpeed();
            this.p1Rocket.increaseSpeed();
            this.flag = false;
        }    

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            const highScoreManager = this.registry.get('highScoreManager');
            highScoreManager.setHighScore(this.p1Score);
            this.backgroundMusic.stop();

            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            const highScoreManager = this.registry.get('highScoreManager');
            highScoreManager.setHighScore(this.p1Score);
            this.backgroundMusic.stop();
            
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 4;
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();

            this.ship04.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);   
        }

        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        const highScoreManager = this.registry.get('highScoreManager');
        if (this.p1Score > highScoreManager.getHighScore()) {
            highScoreManager.setHighScore(this.p1Score);
            this.highScoreText.setText(`${highScoreManager.getHighScore()}`);
        }

    }


    checkCollision(rocket, ship) {
        let shipWidth = ship.width;
        let shipHeight = ship.height;
    
        // Check if the ship is an instance of SmallSpaceship
        if (ship instanceof SmallSpaceship) {
            shipWidth *= 0.3;
            shipHeight *= 0.1;
        }
    
        // // Calculate the adjusted ship position for collision checking
        // const shipX = ship.x + (ship.width - shipWidth) / 2;
        // const shipY = ship.y + (ship.height - shipHeight) / 2;
    
        // Simple AABB checking with the adjusted hitbox
        if (rocket.x < ship.x + shipWidth && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + shipHeight &&
            rocket.height + rocket.y > ship. y) {
            return true;
          } else {
            return false;
          }
    }
    

      shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;

        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);

        boom.anims.play('explode'); // play explode animation
        boom.on('animationcomplete', () => { // callback after ani completes
            ship.reset(); // reset ship position
            ship.alpha = 1; // make ship visible again
            boom.destroy(); // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.remainingTime += 2000;

        const sounds = [
            'sfx_explosion0',
            'sfx_explosion1',
            'sfx_explosion2',
            'sfx_explosion3',
            'sfx_explosion4'
        ];
        
        // generate a random index within the range of the array
        const randomIndex = Math.floor(Math.random() * sounds.length);
        
        // play the sound at the randomly selected index
        this.sound.play(sounds[randomIndex]);
    }
    
      updateTimer() {
        let timeConfig = {
          fontFamily: 'Courier',
          fontSize: '28px',
          backgroundColor: '#F3B141',
          color: '#843605',
          align: 'right',
          padding: {
            top: 5,
            bottom: 5,
          },
          fixedWidth: 100
        };
        this.remainingTimeDisplay?.destroy();
        this.remainingTimeDisplay = this.add.text(game.config.width - borderUISize - borderPadding - timeConfig.fixedWidth,
             borderUISize + borderPadding * 2, Math.ceil(this.remainingTime / 1000), timeConfig);
      }

      decreaseRemainingTime() {
        if (!this.gameOver) {
            this.remainingTime -= 1000;
            this.updateTimer();
    
            if (this.remainingTime <= 0) {
                let scoreConfig = {
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
                };
    
                    this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                    this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← for Menu',
                     scoreConfig).setOrigin(0.5);
                    this.gameOver = true;
                    this.timeEvent.remove(); // Stop the countdown timer
                }
            }
        }    
  }
  