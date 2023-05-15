class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;

        
    }

    

    update() {
        // Move horizontally to the left
        this.x -= this.moveSpeed;

        

        // Wrap around the screen horizontally
        if (this.x <= 0 - this.width) {
            this.x = game.config.width;
            
        } else if (this.x >= game.config.width + this.width) {
            this.x = 0 - this.width;
        }

        
    }

    reset() {
        this.x = game.config.width;
    }

    increaseSpeed() {
        this.moveSpeed += 1; // You can adjust this value to change the speed increase amount
    }
}
