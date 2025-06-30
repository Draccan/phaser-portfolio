import Phaser from "phaser";

export default class Card extends Phaser.GameObjects.Container {
    public isFlipped = false;
    public value: number;

    private front: Phaser.GameObjects.Image;
    private back: Phaser.GameObjects.Image;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        cardWidth: number,
        cardHeight: number,
        value: number,
    ) {
        super(scene, x, y);
        this.value = value;

        this.front = scene.add
            .image(0, 0, `card${value}`)
            .setDisplaySize(cardWidth, cardHeight)
            .setSize(cardWidth, cardHeight);
        this.back = scene.add
            .image(0, 0, "back")
            .setDisplaySize(cardWidth, cardHeight)
            .setSize(cardWidth, cardHeight);

        this.front.setVisible(false);
        this.add([this.back, this.front]);

        this.setSize(this.front.width, this.front.height);
        this.setInteractive();

        this.on("pointerdown", () => {
            if (!this.isFlipped) {
                this.emit("card-clicked");
            }
        });

        scene.add.existing(this);
    }

    flip() {
        this.isFlipped = true;
        this.back.setVisible(false);
        this.front.setVisible(true);
    }

    unflip() {
        this.isFlipped = false;
        this.front.setVisible(false);
        this.back.setVisible(true);
    }

    hide() {
        this.setVisible(false);
        this.disableInteractive();
    }
}
