import BaseScene from "../BaseScene";

enum AudioKeys {
    Win = "win",
}

export default class GameScene extends BaseScene {
    protected initScene(): void {
        console.log("GameScene initialized");
    }

    preload() {
        this.load.audio(AudioKeys.Win, "assets/sounds/win.mp3");
    }

    protected handleWin(): void {
        this.sound.play(AudioKeys.Win);
        this.physics.pause();
        this.add
            .text(this.scale.width / 2, this.scale.height / 2, "🎉 You Win!", {
                fontSize: "32px",
                color: "#00ff00",
            })
            .setOrigin(0.5);
    }
}
