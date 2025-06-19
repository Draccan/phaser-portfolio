import Phaser from "phaser";

import AboutScene from "./scenes/About";
import { SceneName } from "./scenes/commons/enums";
import GameScene from "./scenes/Game";
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
    scene: [HomeScene, AboutScene, GameScene],
};

const lastScene = localStorage.getItem("lastScene") || SceneName.Home;

const game = new Phaser.Game(config);
game.scene.start(lastScene);
