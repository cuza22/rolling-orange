import { 
    Orange 
} from "./orange.js";

export class OrangeController {
    constructor() {
        this.items = [];
        this.cur = 0;
    }

    addOrange() {
        this.items.push(
            new Orange()
        );
    }

    draw(ctx, t, dots) {
        this.cur += 1;
        if(this.cur > 200) {
            this.cur = 0;
            this.addOrange();
        }

        for (let i = this.items.length - 1; i >= 0; i--) {
            const item = this.items[i];
            if (item.x < -item.width) {
                this.items.splice(i, 1);
            } else {
                item.draw(ctx, t, dots);
            }
        }
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

}

