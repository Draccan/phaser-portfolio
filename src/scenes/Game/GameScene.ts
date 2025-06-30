import { ButtonStyle, ButtonType, createButton } from "../../components/Button";
import BaseScene from "../BaseScene";
import { SceneName } from "../commons/enums";

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

    protected handleWin(nextScene: SceneName): void {
        this.sound.play(AudioKeys.Win);
        this.physics.pause();
        this.add
            .text(this.scale.width / 2, this.scale.height / 2, "🎉 You Win!", {
                fontSize: "32px",
                color: "#00ff00",
            })
            .setOrigin(0.5);
        createButton(
            this,
            ButtonType.Primary,
            ButtonStyle.Default,
            "Next level",
            this.scale.width / 2,
            this.scale.height / 2 + 50,
            {
                type: "pointerdown",
                function: () => {
                    this.scene.start(nextScene);
                },
            },
        ).setDepth(1000);
    }
}
