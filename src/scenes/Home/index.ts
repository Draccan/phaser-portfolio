import Phaser from "phaser";

import { ButtonStyle, ButtonType, createButton } from "../../components/Button";
import { SceneName } from "../commons/enums";

export default class HomeScene extends Phaser.Scene {
    constructor() {
        super(SceneName.Home);
    }

    preload() {
        if (!this.textures.exists("background")) {
            this.load.image("background", "/background.png");
        }
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
                onClick: () => this.scene.start(SceneName.Game),
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
                    window.open(
                        "https://github.com/Draccan/phaser-portfolio",
                        "_blank",
                    ),
            },
            {
                label: "About",
                onClick: () => this.scene.start(SceneName.About),
            },
        ];

        buttons.forEach((button, index) => {
            const yOffset = index * 70;
            createButton(
                this,
                ButtonType.Primary,
                ButtonStyle.Ghost,
                button.label,
                centerX,
                centerY + yOffset,
                { type: "pointerdown", function: button.onClick },
            );
        });
    }
}
