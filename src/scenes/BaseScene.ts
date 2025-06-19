import Phaser from "phaser";

export default abstract class BaseScene extends Phaser.Scene {
    constructor(key: string) {
        super(key);
    }

    create(...args: any[]): void {
        localStorage.setItem("lastScene", this.scene.key);
        this.initScene(...args);
    }

    protected abstract initScene(...args: any[]): void;
}
