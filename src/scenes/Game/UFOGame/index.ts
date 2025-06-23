import {
    ButtonStyle,
    ButtonType,
    createButton,
} from "../../../components/Button";
import { SceneName } from "../../commons/enums";
import BaseScene from "../../BaseScene";

export default class UFOGameScene extends BaseScene {
    private ufo!: Phaser.Physics.Arcade.Sprite;
    private meteors!: Phaser.Physics.Arcade.Group;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private timerMessage!: Phaser.GameObjects.Text;
    private timerEvent!: Phaser.Time.TimerEvent;
    private gameOver = false;

    constructor() {
        super(SceneName.UFOGame);
    }

    protected initScene(): void {
        console.log("UFOGameScene initialized");
    }

    preload() {
        this.load.image("ufo", "assets/ufo.png");
        this.load.image("meteor", "assets/meteor.png");
        this.load.image("ufoGameBackground", "assets/spaceBackground.png");
    }

    create() {
        super.create();

        this.add
            .image(
                this.scale.width / 2,
                this.scale.height / 2,
                "ufoGameBackground",
            )
            .setDisplaySize(this.scale.width, this.scale.height);

        this.ufo = this.physics.add
            .sprite(this.scale.width / 2, this.scale.height - 50, "ufo")
            .setDisplaySize(64, 64)
            .setOffset(0, 0)
            .setCollideWorldBounds(true);

        // Docs: setSize is for collision size
        this.ufo.setSize(this.ufo.width, this.ufo.height / 2);

        this.cursors = this.input.keyboard!.createCursorKeys();
        this.meteors = this.physics.add.group();

        this.physics.add.collider(
            this.ufo,
            this.meteors,
            this.handleCollision,
            undefined,
            this,
        );

        this.timerMessage = this.add.text(this.scale.width - 64, 16, "30", {
            fontSize: "24px",
            color: "#ffffff",
        });
        this.timerEvent = this.time.addEvent({
            delay: 30000,
            callback: this.handleWin,
            callbackScope: this,
        });

        this.time.addEvent({
            delay: 200,
            loop: true,
            callback: this.createMeteors,
            callbackScope: this,
        });
    }

    update() {
        if (this.gameOver) return;

        const speed = 200;
        if (this.cursors.left?.isDown) {
            this.ufo.setVelocityX(-speed);
        } else if (this.cursors.right?.isDown) {
            this.ufo.setVelocityX(speed);
        } else {
            this.ufo.setVelocityX(0);
        }

        const remaining = Math.ceil(this.timerEvent.getRemaining() / 1000);
        this.timerMessage.setText(remaining.toString());
    }

    private createMeteors() {
        if (!this.gameOver) {
            const xAssisRandomPoint = Phaser.Math.Between(0, this.scale.width);
            const meteor = (
                this.meteors.create(
                    xAssisRandomPoint,
                    0,
                    "meteor",
                ) as Phaser.Physics.Arcade.Sprite
            )
                .setVelocityY(Phaser.Math.Between(100, 400))
                .setCollideWorldBounds(false)
                .setActive(true)
                .setVisible(true)
                .setDisplaySize(64, 64)
                .setOffset(0, 0);
            // Docs: setSize is for collision size
            meteor.setSize(meteor.width / 2, meteor.height / 2);
        }
    }

    private handleCollision() {
        this.gameOver = true;
        this.physics.pause();
        this.add
            .text(
                this.scale.width / 2,
                this.scale.height / 2,
                "💥 Game Over!",
                {
                    fontSize: "32px",
                    color: "#ff0000",
                },
            )
            .setOrigin(0.5);
    }

    private handleWin() {
        this.gameOver = true;
        this.physics.pause();
        this.add
            .text(this.scale.width / 2, this.scale.height / 2, "🎉 You Win!", {
                fontSize: "32px",
                color: "#00ff00",
            })
            .setOrigin(0.5);
    }
}
