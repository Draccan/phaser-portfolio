import Phaser from "phaser";

import AboutScene from "./scenes/About";
import HomeScene from "./scenes/Home";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#000000",
    scale: {
        mode: Phaser.Scale.ScaleModes.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [HomeScene, AboutScene],
};

new Phaser.Game(config);
