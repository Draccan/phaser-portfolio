import Phaser from "phaser";

export function createMainText(
    scene: Phaser.Scene,
    text: string,
    x: number,
    y: number,
) {
    return scene.add
        .text(x, y, text, {
            fontSize: "32px",
            color: "#ffffff",
            backgroundColor: "#000000aa",
            padding: { x: 20, y: 10 },
            align: "center",
        })
        .setOrigin(0.5);
}
