import Phaser from "phaser";

import AboutScene from "./scenes/About";
import { SceneName } from "./scenes/commons/enums";
import GameScene from "./scenes/Game";
import UFOGameScene from "./scenes/Game/UFOGame";
import HomeScene from "./scenes/Home";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#000000",
    parent: "phaser-container",
    dom: {
        createContainer: true,
    },
    scale: {
        mode: Phaser.Scale.ScaleModes.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },
    callbacks: {
        postBoot: (game) => {
            const lastScene =
                localStorage.getItem("lastScene") || SceneName.Home;
            game.scene.stop(SceneName.Home);
            game.scene.start(lastScene);
        },
    },
    scene: [HomeScene, AboutScene, GameScene, UFOGameScene],
};

const game = new Phaser.Game(config);
