class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      scene.add.existing(this); // add to existing, displayList, updateList
      this.isFiring = false; // track rocket's firing status
      this.moveSpeed = 2; // pixels per frame
      this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
  
      // Add FIRE text
      this.fireText = scene.add.text(game.config.width / 2 + 100, borderUISize + borderPadding*2 + 18,
       'FIRE', { fontFamily: 'Arial', fontSize: '28px',
       backgroundColor: '#F3B141',
        color: '#fff' }).setOrigin(0.5);

    }
  
    update() {
      // left/right movement without checking isFiring
      if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
        this.x -= this.moveSpeed;
      } else if (
        keyRIGHT.isDown &&
        this.x <= game.config.width - borderUISize - this.width
      ) {
        this.x += this.moveSpeed;
      }
  
      // fire button
      if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
        this.isFiring = true;
        this.sfxRocket.play();
      }
      // if fired, move up
      if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
        this.y -= this.moveSpeed;
      }
      // reset on miss
      if (this.y <= borderUISize * 3 + borderPadding) {
        this.reset();
      }
  
      // Toggle FIRE text visibility
      if (this.isFiring) {
        this.fireText.visible = true;
      } else {
        this.fireText.visible = false;
      }
    }
  
    // reset rocket to "ground"
    reset() {
      this.isFiring = false;
      this.y = game.config.height - borderUISize - borderPadding;
    }
  }
  