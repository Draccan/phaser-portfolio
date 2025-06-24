export default function createGameOverText(scene: Phaser.Scene) {
    scene.add
        .text(scene.scale.width / 2, scene.scale.height / 2, "💥 Game Over!", {
            fontSize: "32px",
            color: "#ff0000",
        })
        .setOrigin(0.5);
}
