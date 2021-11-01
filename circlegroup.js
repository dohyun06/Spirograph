import { Circle } from './circle.js';

export class CircleGroup {
    constructor() {
        this.zoom = 1;

        this.totalCircle = 2;
        this.speed = 0.05; /* 0.01 <= speed <= 0.1 */
        this.point = 0;

        this.isHypo = false;
        this.isTrochoid = false;

        this.radiuses = [50, 50, 50, 50, 50];
        this.speeds = [];
        this.cRadiuses = [];
        this.circles = [];

        for (let i = 0; i < this.totalCircle; i++) {
            this.cRadiuses[i] = this.radiuses[i] + (i === this.totalCircle - 1 ? (this.isTrochoid ? this.point : 0) : this.radiuses[i + 1] * (this.isHypo ? -1 : 1));
        }

        for (let i = 0; i < this.totalCircle; i++) {
            this.speeds[i] = i === 0 ? this.speed : (this.radiuses[0] / this.radiuses[i]) * this.speed + this.speeds[i - 1] * (this.isHypo ? -1 : 1);
        }

        for (let i = 0; i < this.totalCircle; i++) {
            this.circles[i] = new Circle(i, this.isHypo, this.cRadiuses[i], this.speeds[i]);
        }
    }

    settings() {
        this.speeds = [];
        this.cRadiuses = [];
        this.circles = [];

        for (let i = 0; i < this.totalCircle; i++) {
            this.cRadiuses[i] =
                this.radiuses[i] * this.zoom + (i === this.totalCircle - 1 ? (this.isTrochoid ? this.point : 0) : this.radiuses[i + 1] * this.zoom * (this.isHypo ? -1 : 1));
        }

        for (let i = 0; i < this.totalCircle; i++) {
            this.speeds[i] = i === 0 ? this.speed : (this.radiuses[0] / this.radiuses[i]) * this.speed + this.speeds[i - 1] * (this.isHypo ? -1 : 1);
        }

        for (let i = 0; i < this.totalCircle; i++) {
            this.circles[i] = new Circle(i, this.isHypo, this.cRadiuses[i], this.speeds[i]);
        }
    }

    resize(x, y) {
        this.circles[0].resize(x, y);
    }

    draw(ctx) {
        this.circles[0].move();

        for (let i = 1; i < this.totalCircle; i++) {
            this.circles[i].resize(this.circles[i - 1].x, this.circles[i - 1].y);
            this.circles[i].move();
        }

        this.circles[this.totalCircle - 1].draw(ctx);
    }
}
