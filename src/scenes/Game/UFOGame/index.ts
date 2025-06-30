import createGameOverText from "../../../components/GameOverText";
import UFOPlayer from "../../../model/implementation/UFOPlayer";
import GameScene from "../GameScene";
import { SceneName } from "../../commons/enums";

const GAME_DURATION = 3000;

enum ImageKeys {
    Ufo = "ufo",
    Meteor = "meteor",
    UfoGameBackground = "ufoGameBackground",
}

enum AudioKeys {
    Explosion = "explosion",
    Space = "space",
    Win = "win",
}

export default class UFOGameScene extends GameScene {
    private ufo!: UFOPlayer;
    private meteors!: Phaser.Physics.Arcade.Group;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private timerMessage!: Phaser.GameObjects.Text;
    private winTimer!: Phaser.Time.TimerEvent;
    private spaceSound!:
        | Phaser.Sound.NoAudioSound
        | Phaser.Sound.HTML5AudioSound
        | Phaser.Sound.WebAudioSound;
    private gameOver = false;

    constructor() {
        super(SceneName.UFOGame);
    }

    protected initScene(): void {
        console.log("UFOGameScene initialized");
    }

    preload() {
        super.preload();
        this.load.image(ImageKeys.Ufo, "assets/ufo.png");
        this.load.image(ImageKeys.Meteor, "assets/meteor.png");
        this.load.image(
            ImageKeys.UfoGameBackground,
            "assets/spaceBackground.png",
        );
        this.load.audio(AudioKeys.Explosion, "assets/sounds/sonicBoom.mp3");
        this.load.audio(AudioKeys.Space, "assets/sounds/space.mp3");
    }

    create() {
        super.create();

        this.spaceSound = this.sound.add(AudioKeys.Space);
        this.spaceSound.play();

        this.add
            .image(
                this.scale.width / 2,
                this.scale.height / 2,
                ImageKeys.UfoGameBackground,
            )
            .setDisplaySize(this.scale.width, this.scale.height);

        this.ufo = new UFOPlayer(this, ImageKeys.Ufo);

        this.cursors = this.input.keyboard!.createCursorKeys();
        this.meteors = this.physics.add.group();

        this.physics.add.collider(
            this.ufo.getSprite(),
            this.meteors,
            this.handleCollision,
            undefined,
            this,
        );

        this.timerMessage = this.add.text(this.scale.width - 64, 16, "30", {
            fontSize: "24px",
            color: "#ffffff",
        });
        this.winTimer = this.time.addEvent({
            delay: GAME_DURATION,
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

        if (this.cursors.left?.isDown) {
            this.ufo.moveLeft();
        } else if (this.cursors.right?.isDown) {
            this.ufo.moveRight();
        } else {
            this.ufo.stop();
        }

        this.updateRemainingTimeMessage();
    }

    private updateRemainingTimeMessage() {
        const remaining = Math.ceil(this.winTimer.getRemaining() / 1000);
        this.timerMessage.setText(remaining.toString());
    }

    private createMeteors() {
        if (!this.gameOver) {
            const xAssisRandomPoint = Phaser.Math.Between(0, this.scale.width);
            const meteor = (
                this.meteors.create(
                    xAssisRandomPoint,
                    0,
                    ImageKeys.Meteor,
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
        this.spaceSound.stop();
        this.gameOver = true;
        this.sound.play(AudioKeys.Explosion);
        this.physics.pause();
        this.winTimer.destroy();
        createGameOverText(this);
    }

    protected override handleWin() {
        this.timerMessage.setText("0");
        this.spaceSound.stop();
        this.gameOver = true;
        super.handleWin(SceneName.MemoryGame);
    }
}
