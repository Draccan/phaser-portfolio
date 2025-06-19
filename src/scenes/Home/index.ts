import Phaser from "phaser";

import { SceneNames } from "../commons/enums";

export default class HomeScene extends Phaser.Scene {
    constructor() {
        super(SceneNames.Home);
    }

    preload() {
        this.load.image("background", "/background.png");
    }

    create() {
        this.add
            .image(this.scale.width / 2, this.scale.height / 2, "background")
            .setDisplaySize(this.scale.width, this.scale.height);

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        const buttons = [
            {
                label: "Play Game",
                onClick: () => console.log("Load game scene..."),
            },
            {
                label: "Blog",
                onClick: () =>
                    window.open(
                        "https://www.paolodellaguzzo.com/blog",
                        "_blank",
                    ),
            },
            {
                label: "GitHub",
                onClick: () =>
                    window.open("https://github.com/Draccan", "_blank"),
            },
            {
                label: "About",
                onClick: () => this.scene.start(SceneNames.About),
            },
        ];

        buttons.forEach((button, index) => {
            const yOffset = index * 70;
            const text = this.add
                .text(centerX, centerY + yOffset, button.label, {
                    fontSize: "32px",
                    color: "#ffffff",
                    backgroundColor: "#000000aa",
                    padding: { x: 20, y: 10 },
                    align: "center",
                })
                .setOrigin(0.5)
                .setInteractive({ useHandCursor: true })
                .on("pointerdown", button.onClick);

            text.on("pointerover", () =>
                text.setStyle({ backgroundColor: "#444" }),
            );
            text.on("pointerout", () =>
                text.setStyle({ backgroundColor: "#000000aa" }),
            );
        });
    }
}
