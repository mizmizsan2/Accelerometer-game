document.addEventListener("deviceready", () => {
    navigator.accelerometer.watchAcceleration(onSuccess, onError, { frequency: 30 });
}, false);

let c = [];

let timeLimit = 11;
let time;

let timeBegin;

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
        this.disD = dist(this.xDw, this.yDw, x, y);
        if (this.disD < 50 + xS/2) {
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

    scoreResult = 0;
    scene = "start";

    xUp = random(0, width);
    yUp = random(0, height);

    xS = 0;
    upS = 0;

}
function draw() {
    if (scene == "start")
        startScene();

    if (scene == "play") {
        // background(255, 255, 255);
        fill(255, 255, 255, 160);
        rect(0, 0, width, height);

        fill(255, 0, 0);
        textSize(40);

        ellipse(x, y, xS, xS);
        x = constrain(x - accX * 5, 50, width - 50);
        y = constrain(y + accY * 5, 50, height - 50);

        fill(255, 255, 0);
        ellipse(xUp, yUp, upS, upS);
        disU = dist(x, y, xUp, yUp);

        if (disU < xS/2 + upS/2) {
            fill(0);
            text("up!!!!!!", xUp, yUp);
            xUp = random(0, width);
            yUp = random(0, height);
            scoreCal(10);
            console.log("up");
        }



        for (let i = 0; i < 4; i++) {
            c.push(new Circle(random(0, width), random(0, height), 100)); //pushは関数
            c[i].ptDown();
            if (c[i].del() == 1) {
                c.splice(i, 1);
                scoreCal(-10);
            }
        }

     

        scoreText();

        time = timeLimit - (millis() - timeBegin) / 1000;
        text("制限時間→ " + int(time), 10, 80);

        if (time < 0)
            scene = "result";
    }

    if (scene == "result")
        endScene();

}

function startScene() {
    background(160, 255, 255);
    fill(0);
    textSize(48);
    text("イライラボール", 20, 300);
    textSize(30);
    text("選択してスタート", 30, 620);
    textSize(25);
    text("黄色に当たるとポイントup!", 10, 30);
    text("緑に当たるとポイントdown...", 10, 60);

    fill(160, 255, 160);
    ellipse(65, 400, 70, 70);

    fill(255, 0, 0);
    ellipse(65, 503, 70, 70);
    textSize(30);

    fill(0);

    text("Ｅ   ←イージーモード", 50, 410);
    text("Ｈ   ←ハードモード", 50, 515);

    if (mouseIsPressed) {
        if (dist(65, 400, mouseX, mouseY) <= 70) {
            xS = 80;
            upS = 120;
            timeBegin = millis();
            scene = "play";
        }
        if (dist(65, 503, mouseX, mouseY) <= 70) {
            xS = 120;
            upS = 50;
            timeBegin = millis();
            scene = "play";
        }
    }

}

function scoreCal(score) {
    scoreResult += score;
}

function scoreText() {
    fill(0);
    textSize(24);
    text("score→" + scoreResult, 10, 30);
}

function endScene() {
    background(0);

    //スタート、コンティニューボタン
    fill(0, 255, 0);
    ellipse(65, 590, 70, 70);

    fill(0, 0, 255);
    ellipse(65, 693, 70, 70);

    fill(255);
    text("結果", 50, 450);
    text("ｓ   ←スタート画面", 50, 600);
    text("ｃ   ←コンティニュー", 50, 700);
    textSize(30);
    text(scoreResult + "pt", 50, 500);
    if (mouseIsPressed) {
        if (dist(65, 693, mouseX, mouseY) <= 70) {
            scoreResult = 0;
            timeBegin = millis();
            scene = "play";
        }
        if (dist(65, 590, mouseX, mouseY) <= 70) {
            scoreResult = 0;
            scene = "start";
        }
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