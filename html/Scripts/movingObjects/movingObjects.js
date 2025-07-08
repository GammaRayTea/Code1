"use strict";
var movingObjects;
(function (movingObjects) {
    let initBall;
    const ballList = [];
    let viewPortDimensions;
    const BALL_SPEED = 100;
    let previousTime;
    let currentTime;
    let deltaTime;
    //let simSpeed:number = 13;
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        window.addEventListener("resize", handleResize);
        document.body.addEventListener("click", onClick);
        handleResize();
        initBall = document.getElementsByClassName("ball")[0];
        createBalls(Number(prompt("enter amount to spawn (anything from around 4000 onwoards won't be very fun")));
        setInterval(physicsProcess, 16.6666);
        //simSpeed = Number(prompt("Enter time for a single frame in milliseconds"));
        document.body.removeChild(initBall);
    }
    function physicsProcess() {
        calcDeltaTime();
        movement();
        doCollision();
    }
    function createBalls(_amount, _randomised = true, _clickedPos = [0, 0], _listSize = 0) {
        previousTime = Date.now();
        let ballIndex;
        for (let i = 0; i < _amount; i++) {
            let posToAdd;
            if (_randomised) {
                posToAdd = { "x": randomInt(20, visualViewport?.width), "y": randomInt(100, visualViewport?.height) };
                ballIndex = i;
            }
            else {
                posToAdd = { "x": _clickedPos[0], "y": _clickedPos[1] };
                ballIndex = _listSize + i;
            }
            ballList.push({
                "currentBall": initBall.cloneNode(true),
                "pos": posToAdd,
                "vel": createVelocity()
            });
            let ball = ballList[ballIndex]["currentBall"];
            ball.style.transform = assembleMatrix(ballList[ballIndex]["pos"]["x"], ballList[ballIndex]["pos"]["y"]);
            document.body.appendChild(ball);
            ball.style.backgroundColor = randomColour();
        }
    }
    function movement() {
        let deltaDivided = deltaTime / 1000;
        for (let i = 0; i < ballList.length; i++) {
            let ball = ballList[i];
            ball["vel"]["x"] *= checkBounds(ball["pos"]["x"], viewPortDimensions["x"]);
            ball["vel"]["y"] *= checkBounds(ball["pos"]["y"], viewPortDimensions["y"]);
            ball["pos"]["x"] += ball["vel"]["x"] * deltaDivided;
            ball["pos"]["y"] += ball["vel"]["y"] * deltaDivided;
            ball["currentBall"].style.transform = assembleMatrix(ball["pos"]["x"], ball["pos"]["y"]);
        }
        previousTime = currentTime;
    }
    function doCollision() {
        for (let ball of ballList.slice(0, ballList.length - 1)) {
            for (let nextBall of ballList.slice(ballList.indexOf(ball) + 1)) {
                if (calcBallDistance(ball, nextBall) <= 10) {
                    console.log("collision", nextBall, ball);
                    removeBall(ball.currentBall);
                    removeBall(nextBall.currentBall);
                    // break;
                }
            }
        }
    }
    function calcBallDistance(_ball1, _ball2) {
        let distance = Math.hypot(_ball1.pos.x - _ball2.pos.x, _ball1.pos.y - _ball2.pos.y);
        //console.log(distance);
        return distance;
    }
    function checkBounds(_ballPos, _viewportValue) {
        if (_ballPos > _viewportValue || _ballPos <= 0) {
            return -1;
        }
        else {
            return 1;
        }
    }
    function calcDeltaTime() {
        currentTime = Date.now();
        deltaTime = currentTime - previousTime;
        displayDeltaTime();
    }
    function displayDeltaTime() {
        document.getElementById("frameCounter").innerText = String(Math.round(1000 / deltaTime));
    }
    function randomInt(_min, _max) {
        return _min + Math.floor((_max - _min + 1) * Math.random());
    }
    function assembleMatrix(_translateX, _translateY) {
        return `matrix(10,0,0,10,${_translateX},${_translateY})`;
    }
    function createVelocity() {
        let x = randomInt(-BALL_SPEED, BALL_SPEED);
        let y = randomInt(-BALL_SPEED, BALL_SPEED);
        let timeout = 0;
        while (x == 0 && y == 0) {
            if (timeout == 3) {
                x = 1;
                y = -1;
                break;
            }
            else {
                x = randomInt(-BALL_SPEED, BALL_SPEED);
                y = randomInt(-BALL_SPEED, BALL_SPEED);
                timeout++;
            }
        }
        return { "x": x, "y": y };
    }
    function handleResize() {
        viewPortDimensions = { "x": window.innerWidth, "y": window.innerHeight };
        console.log(viewPortDimensions);
    }
    function onClick(_event) {
        let clickedElement = _event.target;
        if (clickedElement.className == "ball") {
            removeBall(clickedElement);
        }
        else if (clickedElement.className == "body") {
            createBalls(1, false, [_event.pageX, _event.pageY - 50], ballList.length);
        }
    }
    function removeBall(_ballToRemove) {
        for (let ball of ballList) {
            if (ball["currentBall"] == _ballToRemove) {
                ballList.splice(ballList.indexOf(ball), 1);
            }
        }
        _ballToRemove.remove();
    }
    function randomColour() {
        return `rgb(${randomInt(20, 255)},${randomInt(20, 255)},${randomInt(20, 255)})`;
    }
})(movingObjects || (movingObjects = {}));
//# sourceMappingURL=movingObjects.js.map