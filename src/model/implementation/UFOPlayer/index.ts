import BasePlayer from "../BasePlayer";

export default class UFOPlayer extends BasePlayer {
    constructor(scene: Phaser.Scene, imageKey: string) {
        const ufo = scene.physics.add
            .sprite(scene.scale.width / 2, scene.scale.height - 50, imageKey)
            .setDisplaySize(64, 64)
            .setCollideWorldBounds(true);

        // Docs: setSize is for collision size
        ufo.setSize(ufo.width, ufo.height / 2);
        super(ufo);
    }
}
