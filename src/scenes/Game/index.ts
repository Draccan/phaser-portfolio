import { ButtonStyle, ButtonType, createButton } from "../../components/Button";
import { createMainText } from "../../components/MainText";
import BaseScene from "../BaseScene";
import { SceneName } from "../commons/enums";

export default class GameScene extends BaseScene {
    constructor() {
        super(SceneName.Game);
    }

    protected initScene(): void {
        console.log("GameScene initialized");
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

        createButton(
            this,
            ButtonType.Primary,
            ButtonStyle.Default,
            "Start Game",
            centerX,
            centerY + 100,
            {
                type: "pointerdown",
                function: () => {
                    this.scene.start(SceneName.UFOGame);
                },
            },
        );
    }
}
