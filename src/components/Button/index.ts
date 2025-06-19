export enum ButtonType {
    Primary = "primary",
}

function createButtonFactory(
    scene: Phaser.Scene,
    buttonType: ButtonType,
    text: string,
    x: number,
    y: number,
): Phaser.GameObjects.Text {
    switch (buttonType) {
        case ButtonType.Primary:
            return createPrimaryButton(scene, text, x, y);
        default:
            throw new Error(`Unknown button type: ${buttonType}`);
    }
}

function createPrimaryButton(
    scene: Phaser.Scene,
    text: string,
    x: number,
    y: number,
): Phaser.GameObjects.Text {
    const button = scene.add
        .text(x, y, text, {
            fontSize: "32px",
            color: "#ffffff",
            backgroundColor: "#77dd77",
            fontStyle: "bold",
            padding: { x: 20, y: 10 },
            align: "center",
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });
    button.on("pointerover", () =>
        button.setStyle({ backgroundColor: "#66bb66" }),
    );
    button.on("pointerout", () =>
        button.setStyle({ backgroundColor: "#77dd77" }),
    );
    return button;
}

export { createButtonFactory as createButton };
