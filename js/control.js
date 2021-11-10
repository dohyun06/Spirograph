import { CircleGroup } from './circlegroup.js';

export class Control {
    constructor() {
        this.h4Zoom = document.querySelector('div.zoom h4');
        this.inputZoom = document.querySelector('div.zoom input');
        this.inputZoom.addEventListener('input', this.handleZoom.bind(this));

        this.h4TotalCircle = document.querySelector('div.totalCircle h4');
        this.inputTotalCircle = document.querySelector('div.totalCircle input');
        this.inputTotalCircle.addEventListener('input', this.handleTotalCircle.bind(this));

        this.h4Speed = document.querySelector('div.speed h4');
        this.inputSpeed = document.querySelector('div.speed input');
        this.inputSpeed.addEventListener('input', this.handleSpeed.bind(this));

        this.h4IsHypo = document.querySelector('div.isHypo h4');
        this.inputIsHypo = document.querySelector('div.isHypo input');
        this.inputIsHypo.addEventListener('click', this.handleIsHypo.bind(this));

        this.h4IsTrochoid = document.querySelector('div.isTrochoid h4');
        this.inputIsTrochoid = document.querySelector('div.isTrochoid input');
        this.inputIsTrochoid.addEventListener('click', this.handleIsTrochoid.bind(this));

        this.h4Point = document.querySelector('div.point h4');
        this.inputPoint = document.querySelector('div.point input');
        this.inputPoint.addEventListener('input', this.handlePoint.bind(this));

        this.h4Circle = [
            document.querySelector('div.circle1 h4'),
            document.querySelector('div.circle2 h4'),
            document.querySelector('div.circle3 h4'),
            document.querySelector('div.circle4 h4'),
            document.querySelector('div.circle5 h4'),
        ];

        this.inputCircle = [
            document.querySelector('div.circle1 input'),
            document.querySelector('div.circle2 input'),
            document.querySelector('div.circle3 input'),
            document.querySelector('div.circle4 input'),
            document.querySelector('div.circle5 input'),
        ];

        for (let i = 0; i < 5; i++) {
            this.inputCircle[i].addEventListener('input', this.handleCircle.bind(this, i));
        }

        this.clear = false;

        this.circleGroup = new CircleGroup();
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.centerX = stageWidth / 2;
        this.centerY = stageHeight / 2;
        this.circleGroup.resize(this.stageWidth / 2, this.stageHeight / 2);
    }

    draw(ctx) {
        if (this.clear) {
            ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
            this.clear = false;
        }
        this.circleGroup.draw(ctx);
    }

    handleZoom() {
        this.circleGroup.zoom = Number(this.inputZoom.value);
        this.h4Zoom.innerText = 'Zoom : ' + this.inputZoom.value;

        this.clear = true;
        this.circleGroup.settings();
        this.circleGroup.resize(this.centerX, this.centerY);
    }

    handleTotalCircle() {
        this.circleGroup.totalCircle = Number(this.inputTotalCircle.value);
        this.h4TotalCircle.innerText = 'Amount of Circles : ' + this.inputTotalCircle.value;

        this.clear = true;
        this.circleGroup.settings();
        this.circleGroup.resize(this.centerX, this.centerY);
    }

    handleSpeed() {
        this.circleGroup.speed = Number(this.inputSpeed.value) / 1000;
        this.h4Speed.innerText = 'Speed : ' + this.inputSpeed.value + ' (The higher the speed, the greater the error)';

        this.clear = true;
        this.circleGroup.settings();
        this.circleGroup.resize(this.centerX, this.centerY);
    }

    handleIsHypo() {
        if (this.circleGroup.isHypo === true) {
            this.circleGroup.isHypo = false;
            this.h4IsHypo.innerText = 'IsHypo : false';

            for (let i = 0; i < 5; i++) {
                this.inputCircle[i].max = 100;
            }
        } else {
            this.circleGroup.isHypo = true;
            this.h4IsHypo.innerText = 'IsHypo : true';

            for (let i = 1; i < 5; i++) {
                this.inputCircle[i].max = this.inputCircle[i - 1].value;
                this.circleGroup.radiuses[i] = Number(this.inputCircle[i].value);
                this.h4Circle[i].innerText = 'Radius of Circle' + (i + 1) + ' : ' + this.inputCircle[i].value;
            }
        }

        this.clear = true;
        this.circleGroup.settings();
        this.circleGroup.resize(this.centerX, this.centerY);
    }

    handleIsTrochoid() {
        if (this.circleGroup.isTrochoid === true) {
            this.circleGroup.isTrochoid = false;
            this.h4IsTrochoid.innerText = 'IsTrochoid: false';
        } else {
            this.circleGroup.isTrochoid = true;
            this.h4IsTrochoid.innerText = 'IsTrochoid : true';
        }

        this.clear = true;
        this.circleGroup.settings();
        this.circleGroup.resize(this.centerX, this.centerY);
    }

    handlePoint() {
        this.circleGroup.point = Number(this.inputPoint.value);
        this.h4Point.innerText = 'Point : ' + this.inputPoint.value + ' (This is used when is Trochoid is true)';

        this.clear = true;
        this.circleGroup.settings();
        this.circleGroup.resize(this.centerX, this.centerY);
    }

    handleCircle(index) {
        this.circleGroup.radiuses[index] = Number(this.inputCircle[index].value);
        this.h4Circle[index].innerText = 'Radius of Circle' + (index + 1) + ' : ' + this.inputCircle[index].value;

        if (this.circleGroup.isHypo === true) {
            for (let i = index + 1; i < 5; i++) {
                this.inputCircle[i].max = this.inputCircle[i - 1].value;
                this.circleGroup.radiuses[i] = Number(this.inputCircle[i].value);
                this.h4Circle[i].innerText = 'Radius of Circle' + (i + 1) + ' : ' + this.inputCircle[i].value;
            }
        }

        this.clear = true;
        this.circleGroup.settings();
        this.circleGroup.resize(this.centerX, this.centerY);
    }
}
