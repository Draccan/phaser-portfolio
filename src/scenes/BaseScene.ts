import Phaser from "phaser";

export default abstract class BaseScene extends Phaser.Scene {
    constructor(key: string) {
        super(key);
    }

    create(...args: any[]): void {
        localStorage.setItem("lastScene", this.scene.key);
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.onShutdown, this);
        this.initScene(...args);
    }

    private onShutdown(): void {
        const last = localStorage.getItem("lastScene");
        if (last === this.scene.key) {
            localStorage.removeItem("lastScene");
        }
    }

    protected abstract initScene(...args: any[]): void;
}
