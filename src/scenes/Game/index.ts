import Phaser from "phaser";

import { ButtonType, createButton } from "../../components/Button";
import { createMainText } from "../../components/MainText";
import BaseScene from "../BaseScene";
import { SceneName } from "../commons/enums";

export default class GameScene extends BaseScene {
    protected initScene(): void {
        console.log("GameScene initialized");
    }

    constructor() {
        super(SceneName.Game);
    }

    preload() {
        if (!this.textures.exists("background")) {
            this.load.image("background", "/background.png");
        }
    }

    create() {
        super.create();

        this.add
            .image(this.scale.width / 2, this.scale.height / 2, "background")
            .setDisplaySize(this.scale.width, this.scale.height);

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        createMainText(
            this,
            "Welcome!\n Every level will have different rules and a different game!\n Press the button when you are ready!",
            centerX,
            centerY,
        );

        const startButton = createButton(
            this,
            ButtonType.Primary,
            "Start Game",
            centerX,
            centerY + 100,
        );

        startButton.on("pointerdown", () => {
            console.log("Game started!");
            // Add game logic here
        });

        this.input.once("pointerdown", () => {
            localStorage.removeItem("lastScene");
            // TODO remove in automatico tipo all'unmount qualcosa di simile e mettere logica in baseScene?!
            // + Bottoni menù con utilizzo componente
            this.scene.start(SceneName.Home);
        });
    }
}
