export class Circle {
    constructor(index, isHypo, radius, speed) {
        this.index = index;
        this.isHypo = isHypo;
        this.radius = radius;
        this.speed = speed;
        this.angle = (Math.PI * 3) / 2;
        this.x = this.prevX = this.x + Math.cos(this.angle) * this.radius;
        this.y = this.prevY = this.y + Math.sin(this.angle) * this.radius;
    }

    resize(x, y) {
        this.centerX = x;
        this.centerY = y;
    }

    move() {
        this.prevX = this.x;
        this.prevY = this.y;
        this.x = this.centerX + Math.cos(this.angle) * this.radius;
        this.y = this.centerY + Math.sin(this.angle) * this.radius;
        this.cx1 = this.cx2;
        this.cy1 = this.cy2;
        this.cx2 = (this.prevX + this.x) / 2;
        this.cy2 = (this.prevY + this.y) / 2;

        this.update();
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgb(200,255,255)';
        ctx.shadowColor = 'rgb(0,255,255)';
        ctx.shadowBlur = 3;
        ctx.moveTo(this.cx1, this.cy1);
        ctx.quadraticCurveTo(this.prevX, this.prevY, this.cx2, this.cy2);
        ctx.stroke();

        /* ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
        ctx.fill(); */
    }

    update() {
        this.angle += this.speed * (this.isHypo && this.index % 2 === 0 ? -1 : 1);
    }
}
