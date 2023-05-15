class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;

        // Set a constant vertical direction for each spaceship
        this.verticalDirection = this.getRandomDirection();
    }

    getRandomDirection() {
        const directions = [-0.2, 0, 0.2];
        const randomIndex = Math.floor(Math.random() * directions.length);
        return directions[randomIndex];
    }

    update() {
        // Move horizontally to the left
        this.x -= this.moveSpeed;

        // Move vertically based on the verticalDirection value
        this.y += this.verticalDirection * this.moveSpeed;

        // Wrap around the screen horizontally
        if (this.x <= 0 - this.width) {
            this.x = game.config.width;
            this.y = Phaser.Math.Between(borderUISize, game.config.height * 5);
        } else if (this.x >= game.config.width + this.width) {
            this.x = 0 - this.width;
        }

        // Clamp the vertical position to stay within the screen
        this.y = Phaser.Math.Clamp(this.y, this.height / 2, game.config.height - this.height / 2);
    }

    reset() {
        this.x = game.config.width;
    }

    increaseSpeed() {
        this.moveSpeed += 1; // You can adjust this value to change the speed increase amount
    }
}
