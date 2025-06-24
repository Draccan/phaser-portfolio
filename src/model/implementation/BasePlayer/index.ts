import IBasePlayer from "../../interfaces/IBasePlayer";

export default class BasePlayer implements IBasePlayer {
    private sprite!: Phaser.Physics.Arcade.Sprite;
    private speed: number = 200;

    constructor(sprite: Phaser.Physics.Arcade.Sprite, speed?: number) {
        this.sprite = sprite;
        this.speed = speed || this.speed;
    }

    getSprite(): Phaser.Physics.Arcade.Sprite {
        return this.sprite;
    }

    moveLeft(speed?: number) {
        this.sprite.setVelocityX(-(speed || this.speed));
    }

    moveRight(speed?: number) {
        this.sprite.setVelocityX(speed || this.speed);
    }

    stop() {
        this.sprite.setVelocityX(0);
    }
}
