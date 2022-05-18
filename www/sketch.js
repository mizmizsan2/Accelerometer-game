document.addEventListener("deviceready", () => {
    navigator.accelerometer.watchAcceleration(onSuccess, onError, { frequency: 30 });
}, false);

let c = [];

class Circle {
    constructor(x, y, s) {
        this.xDw = x;
        this.yDw = y;
        this.s = s;
        this.disD;
    }
    ptDown() {
        fill(0, 255, 0);
        ellipse(this.xDw, this.yDw, this.s, this.s);
    }

    del() {
        // console.log(`x:${mouseX}, y:${mouseY}`);
        this.disD = dist(this.xDw, this.yDw, x, y);
        if (this.disD < this.s) {
            fill(0);
            text("down....", this.xDw, this.yDw);
            return 1;
        } else {
            return 0;
        }
    }
}

let accX = 0, accY = 0, accZ = 0;
let x, y;
let disU;

function setup() {
    createCanvas(windowWidth, windowHeight);
    x = width / 2;
    y = height / 2;

    xUp = random(0, width);
    yUp = random(0, height);

}
function draw() {
    // background(255, 255, 255);
    fill(255, 255, 255, 160);
    rect(0, 0, width, height);

    fill(255, 0, 0);
    textSize(40);
    text(`x=${accX.toPrecision(3)}`, 10, 40);
    text(`y=${accY.toPrecision(3)}`, 10, 80);
    text(`z=${accZ.toPrecision(3)}`, 10, 120);

    let theta = degrees(Math.atan(accX / accY));
    text(`theta=${theta.toPrecision(3)}`, 10, 160);

    ellipse(x, y, 80, 80);
    x = constrain(x - accX * 5, 50, width - 50);
    y = constrain(y + accY * 5, 50, height - 50);

    fill(255, 255, 0);
    ellipse(xUp, yUp, 120, 120);

    disU = dist(x, y, xUp, yUp);
    if (disU < 100) {
        fill(0);
        text("up!!!!!!", xUp, yUp);
        xUp = random(0, width);
        yUp = random(0, height);
        console.log("up");
    }



    for (let i = 0; i < 4; i++) {
        c.push(new Circle(random(0, width), random(0, height), 80)); //pushは関数
        c[i].ptDown();
        if (c[i].del() == 1) 
            c.splice(i, 1);
    }

}

function onSuccess(acceleration) {
    // グローバル変数にコピーして
    // drawの中で参照できるようにする
    accX = acceleration.x;
    accY = acceleration.y;
    accZ = acceleration.z;
}
// 加速度センサの読み込み失敗
function onError() {
    console.log("Error!");
}