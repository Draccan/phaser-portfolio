import Phaser from "phaser";

import { SceneName } from "../commons/enums";

export default class AboutScene extends Phaser.Scene {
    constructor() {
        super(SceneName.About);
    }

    create() {
        this.add.dom(this.scale.width / 2, this.scale.height / 2)
            .createFromHTML(`<div>
                <div class="about-box">
                    <p>Created by <strong>Paolo Dell'Aguzzo</strong></p>
                    <p>Senior Software Engineer</p>
                    <a href="https://www.linkedin.com/in/paolodellaguzzo/" target="_blank">Visit my LinkedIn profile</a>
                </div>
            </div>`);

        this.input.once("pointerdown", () => {
            this.scene.start(SceneName.Home);
        });
    }
}
