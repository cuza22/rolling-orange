import {
    Hill
} from './hill.js';

import {
    OrangeController
} from './orange-controller.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.hills = [
            new Hill('#b3f8c8', 0.2, 12),
            new Hill('#68ecb5', 0.5, 8),
            new Hill('#31c249', 1.4, 6)
        ]; 
    
        this.oranges = new OrangeController();

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);
    
        for (let i = 0; i < this.hills.length; i++) {
            this.hills[i].resize(this.stageWidth, this.stageHeight);
        }

        this.oranges.resize(this.stageWidth, this.stageHeight);

    }

    animate(t) {
        requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        
        let dots;
        for(let i = 0; i < this.hills.length; i++) {
            dots = this.hills[i].draw(this.ctx);
        }

        this.oranges.draw(this.ctx, t, dots);
    }
}

window.onload = () => {
    new App();
};