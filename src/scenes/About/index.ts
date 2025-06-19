import Phaser from "phaser";

import { SceneNames } from "../commons/enums";

export default class AboutScene extends Phaser.Scene {
    constructor() {
        super(SceneNames.About);
    }

    create() {
        this.add
            .text(
                this.scale.width / 2,
                this.scale.height / 2,
                "Created by Paolo\nSenior software developer",
                {
                    fontSize: "28px",
                    color: "#ffffff",
                    align: "center",
                },
            )
            .setOrigin(0.5);

        this.input.once("pointerdown", () => {
            this.scene.start(SceneNames.Home);
        });
    }
}
