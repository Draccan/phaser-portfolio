export default interface IBasePlayer {
    getSprite(): Phaser.Physics.Arcade.Sprite;

    moveLeft(speed?: number): void;

    moveRight(speed?: number): void;

    stop(): void;
}
