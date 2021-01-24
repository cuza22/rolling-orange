export class Orange {
    constructor() {
        this.radius = 20;
        this.x = 0;
        this.y = 0;
        this.number = 2;

        this.speed = Math.random() * 2 + 5;
    }

    draw(ctx, t, dots) {
        if (!this.time) {
            this.time = t;
        }

        this.animate(ctx, dots);
    }

    animate(ctx, dots) {
        this.x += this.speed;
        const closest = this.getY(this.x, dots);
        this.y = closest.y;

        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y - this.radius, 20, 0, Math.PI * 2);
        ctx.fillStyle = "orange";
        ctx.fill();
        ctx.restore();
    }

    getY(x, dots) {
        for (let i = 1; i < dots.length; i++) {
            if (x >= dots[i].x1 && x <= dots[i].x3) {
                return this.getY2(x, dots[i]);
            }
        }

        return {
            y: 0,
            rotation: 0
        };
    }

    getY2(x, dot) {
        const total = 200;
        let pt = this.getPointOnQuad(dot.x1, dot.y1, dot.x2, dot.x3, dot.y3, 0);
        let prevX = pt.x;
        for (let i = 1; i < total; i++) {
            const t = i / total;
            pt = this.getPointOnQuad(dot.x1, dot.y1, dot.x2, dot.y2, dot.x3, dot.y3, t);

            if (x >= prevX && x <= pt.x) {
                return pt;
            }
            prevX = pt.x;
        }
        return pt;
    }

    getQuadValue(p0, p1, p2, t) {
        return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
    }

    getPointOnQuad(x1, y1, x2, y2, x3, y3, t) {
        return {
            x: this.getQuadValue(x1, x2, x3, t),
            y: this.getQuadValue(y1, y2, y3, t),
        };
    }
}