"use strict";
var movingObjects;
(function (movingObjects) {
    let initBall;
    let ballList = [];
    let viewPortDimensions;
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        viewPortDimensions = { "x": visualViewport?.width, "y": visualViewport?.height };
        console.log(viewPortDimensions);
        initBall = document.getElementsByClassName("ball")[0];
        createBalls(Number(prompt("enter amount to spawn")));
        document.body.removeChild(initBall);
    }
    function createBalls(_amount) {
        for (let i = 0; i < _amount; i++) {
            ballList.push({
                "currentBall": initBall.cloneNode(true),
                "pos": { "x": randomInt(1, visualViewport?.width), "y": randomInt(1, visualViewport?.height) },
                "vel": { "x": randomInt(-20, 20), "y": randomInt(-20, 20) }
            });
            ballList[i]["currentBall"].style.transform = assembleMatrix(ballList[i]["pos"]["x"], ballList[i]["pos"]["y"]);
            document.body.appendChild(ballList[i]["currentBall"]);
        }
        setInterval(movement, 16);
    }
    function movement() {
        for (let i = 0; i < ballList.length; i++) {
            let ball = ballList[i];
            ball["vel"]["x"] *= checkBounds(ball["pos"]["x"], viewPortDimensions["x"]);
            ball["vel"]["y"] *= checkBounds(ball["pos"]["y"], viewPortDimensions["y"]);
            ball["pos"]["x"] += ball["vel"]["x"];
            ball["pos"]["y"] += ball["vel"]["y"];
            ball["currentBall"].style.transform = assembleMatrix(ball["pos"]["x"], ball["pos"]["y"]);
        }
    }
    function randomInt(min, max) {
        console.log(min, max);
        return min + Math.floor((max - min + 1) * Math.random());
    }
    function assembleMatrix(_translateX, _translateY) {
        return `matrix(10,0,0,10,${_translateX},${_translateY})`;
    }
    function checkBounds(_ballPos, _viewportValue) {
        if (_ballPos > _viewportValue || _ballPos <= 0) {
            return -1;
        }
        else {
            return 1;
        }
    }
})(movingObjects || (movingObjects = {}));
//# sourceMappingURL=movingObjects.js.map