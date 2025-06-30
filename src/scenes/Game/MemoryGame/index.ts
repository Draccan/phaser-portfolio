import Phaser from "phaser";

import Card from "../../../model/implementation/Card";
import { SceneName } from "../../commons/enums";
import GameScene from "../GameScene";

const TOTAL_CARDS = 8;

export default class MemoryGameScene extends GameScene {
    private cards: Card[] = [];
    private firstCard?: Card;
    private secondCard?: Card;
    private canClick = true;
    private matchedPairs = 0;

    constructor() {
        super(SceneName.MemoryGame);
    }

    protected initScene(): void {
        console.log("MemoryGameScene initialized");
    }

    preload() {
        super.preload();
        this.load.image("back", "assets/cards/back.png");
        for (let i = 1; i <= TOTAL_CARDS; i++) {
            this.load.image(`card${i}`, `assets/cards/${i}.svg`);
        }
    }

    create() {
        super.create();
        const pairs = [...Array(TOTAL_CARDS).keys()].flatMap((i) => [
            i + 1,
            i + 1,
        ]);
        Phaser.Utils.Array.Shuffle(pairs);

        const cols = 4;
        const spacing = 10;
        const cardWidth = 100;
        const cardHeight = 150;

        pairs.forEach((value, i) => {
            const x = (i % cols) * (cardWidth + spacing) + 100;
            const y = Math.floor(i / cols) * (cardHeight + spacing) + 50;

            const card = new Card(this, x, y, cardWidth, cardHeight, value);
            card.on("card-clicked", () => this.handleCardClick(card));
            this.cards.push(card);
        });
    }

    private handleCardClick(card: Card) {
        if (!this.canClick || card.isFlipped || card === this.firstCard) return;

        card.flip();

        if (!this.firstCard) {
            this.firstCard = card;
        } else {
            this.secondCard = card;
            this.canClick = false;

            this.time.delayedCall(800, () => {
                if (this.firstCard!.value === this.secondCard!.value) {
                    this.firstCard!.hide();
                    this.secondCard!.hide();
                    this.matchedPairs++;

                    if (this.matchedPairs === TOTAL_CARDS) {
                        super.handleWin(SceneName.Home);
                    }
                } else {
                    this.firstCard!.unflip();
                    this.secondCard!.unflip();
                }

                this.firstCard = undefined;
                this.secondCard = undefined;
                this.canClick = true;
            });
        }
    }
}
