import { Circle } from './circle.js';

export class CircleGroup {
  constructor() {
    this.zoom = 1;

    this.totalCircle = 2;
    this.speed = 0.005; /* 0.001 <= speed <= 0.1 */
    this.point = 0;

    this.isHypo = false;
    this.isTrochoid = false;

    this.radiuses = [50, 50, 50, 50, 50];
    this.speeds = [];
    this.cRadiuses = [];
    this.circles = [];

    this.dots = [];

    for (let i = 0; i < this.totalCircle; i++) {
      this.cRadiuses[i] =
        this.radiuses[i] +
        (i === this.totalCircle - 1
          ? this.isTrochoid
            ? this.point
            : 0
          : this.radiuses[i + 1] * (this.isHypo ? -1 : 1));
    }

    for (let i = 0; i < this.totalCircle; i++) {
      this.speeds[i] =
        i === 0
          ? this.speed
          : (this.radiuses[0] / this.radiuses[i]) * this.speed + this.speeds[i - 1] * (this.isHypo ? -1 : 1);
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
        (this.radiuses[i] +
          (i === this.totalCircle - 1
            ? this.isTrochoid
              ? this.point
              : 0
            : this.radiuses[i + 1] * (this.isHypo ? -1 : 1))) *
        this.zoom;
    }

    for (let i = 0; i < this.totalCircle; i++) {
      this.speeds[i] =
        i === 0
          ? this.speed
          : (this.radiuses[0] / this.radiuses[i]) * this.speed + this.speeds[i - 1] * (this.isHypo ? -1 : 1);
    }

    for (let i = 0; i < this.totalCircle; i++) {
      this.circles[i] = new Circle(i, this.isHypo, this.cRadiuses[i], this.speeds[i]);
    }
  }

  resize(x, y) {
    this.circles[0].resize(x, y);
  }

  draw(ctx) {
    for (let i = 0; i < 99; i++) {
      this.circles[0].move();

      for (let j = 1; j < this.totalCircle; j++) {
        this.circles[j].resize(this.circles[j - 1].x, this.circles[j - 1].y);
        this.circles[j].move();
      }

      this.dots.push([
        this.circles[this.totalCircle - 1].x,
        this.circles[this.totalCircle - 1].y,
        this.circles[this.totalCircle - 1].cx,
        this.circles[this.totalCircle - 1].cy,
      ]);
    }

    for (let i = 1; i < this.dots.length; i++) {
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgb(200,255,255)';
      ctx.shadowColor = 'rgb(0,255,255)';
      ctx.shadowBlur = 3;
      ctx.moveTo(this.dots[i - 1][2], this.dots[i - 1][3]);
      ctx.quadraticCurveTo(this.dots[i - 1][0], this.dots[i - 1][1], this.dots[i][2], this.dots[i][3]);
      ctx.stroke();
    }
    this.dots.splice(0, this.dots.length - 1);
  }
}
