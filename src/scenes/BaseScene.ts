import Phaser from "phaser";

import { ButtonStyle, ButtonType, createButton } from "../components/Button";
import { SceneName } from "./commons/enums";

export default abstract class BaseScene extends Phaser.Scene {
    constructor(key: string) {
        super(key);
    }

    create(...args: any[]): void {
        localStorage.setItem("lastScene", this.scene.key);
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.onShutdown, this);

        this.initScene(...args);

        createButton(
            this,
            ButtonType.Tertiary,
            ButtonStyle.Default,
            "Back to Home",
            100,
            50,
            {
                type: "pointerdown",
                function: () => {
                    this.scene.start(SceneName.Home);
                },
            },
        ).setDepth(1000);
    }

    private onShutdown(): void {
        const last = localStorage.getItem("lastScene");
        if (last === this.scene.key) {
            localStorage.removeItem("lastScene");
        }
    }

    protected abstract initScene(...args: any[]): void;
}
