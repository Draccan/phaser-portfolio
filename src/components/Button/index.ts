export enum ButtonType {
    Primary = "primary",
    Tertiary = "tertiary",
}

export enum ButtonStyle {
    Default = "default",
    Ghost = "ghost",
}

interface ButtonEvent {
    type: string;
    function: () => void;
}

function createButtonFactory(
    scene: Phaser.Scene,
    buttonType: ButtonType,
    buttonStyle: ButtonStyle,
    text: string,
    x: number,
    y: number,
    event?: ButtonEvent,
): Phaser.GameObjects.Text {
    switch (buttonType) {
        case ButtonType.Primary:
            return createPrimaryButton(scene, text, buttonStyle, x, y, event);
        case ButtonType.Tertiary:
            return createTertiaryButton(scene, text, buttonStyle, x, y, event);
        default:
            throw new Error(`Unknown button type: ${buttonType}`);
    }
}

function createPrimaryButton(
    scene: Phaser.Scene,
    text: string,
    buttonStyle: ButtonStyle,
    x: number,
    y: number,
    event?: ButtonEvent,
): Phaser.GameObjects.Text {
    const button = scene.add
        .text(x, y, text, {
            fontSize: "32px",
            color: "#ffffff",
            backgroundColor:
                buttonStyle === ButtonStyle.Default ? "#77dd77" : "000000aa",
            fontStyle: "bold",
            padding: { x: 20, y: 10 },
            align: "center",
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on(
            event ? event.type : "pointerdown",
            event ? event.function : () => {},
        );

    if (buttonStyle === ButtonStyle.Default) {
        button.on("pointerover", () =>
            button.setStyle({ backgroundColor: "#66bb66" }),
        );
        button.on("pointerout", () =>
            button.setStyle({ backgroundColor: "#77dd77" }),
        );
    } else {
        button.on("pointerover", () =>
            button.setStyle({ backgroundColor: "#444" }),
        );
        button.on("pointerout", () =>
            button.setStyle({ backgroundColor: "#000000aa" }),
        );
    }
    return button;
}

function createTertiaryButton(
    scene: Phaser.Scene,
    text: string,
    buttonStyle: ButtonStyle,
    x: number,
    y: number,
    event?: ButtonEvent,
): Phaser.GameObjects.Text {
    const button = scene.add
        .text(x, y, text, {
            fontSize: "18px",
            color: "#ffffff",
            backgroundColor:
                buttonStyle === ButtonStyle.Default ? "#ffcc00" : "000000aa",
            fontStyle: "bold",
            padding: { x: 15, y: 8 },
            align: "center",
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on(
            event ? event.type : "pointerdown",
            event ? event.function : () => {},
        );

    return button;
}

export { createButtonFactory as createButton };
