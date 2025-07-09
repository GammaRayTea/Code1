"use strict";
var movingObjects;
(function (movingObjects) {
    let inputMap = {
        "shoot": " ",
        "fwrd": "w",
        "bwrd": "s",
        "left": "a",
        "right": "d",
        "slow": "Shift"
    };
    let registeredInputs = [];
    let activeInputs = [];
    const tankList = [];
    let viewPortDimensions;
    let myTank = {
        element: document.createElement("span"),
        pos: { "x": 100, "y": 100 },
        vel: { "x": 0, "y": 0 },
        rot: 0
    };
    const MAX_SPEED = 100;
    let previousTime;
    let currentTime;
    let deltaTime;
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        myTank.element = document.getElementById("tank");
        window.addEventListener("resize", handleResize);
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        handleResize();
        setInterval(processLoop, 16.6666);
        createRegisteredInputList();
    }
    function processLoop() {
        pollInputs();
        calcDeltaTime();
        movement();
        doCollision();
    }
    function movement() {
        let deltaDivided = deltaTime / 1000;
        let slowFactor = 0;
        let inputVec = { "x": 0, "y": 0 };
        if (isInputPressed("slow")) {
            slowFactor = 200;
        }
        if (isInputPressed("fwrd")) {
            inputVec.y += -1;
            myTank.vel.y = -MAX_SPEED * deltaDivided;
        }
        else if (isInputPressed("bwrd")) {
            inputVec.y += 1;
            myTank.vel.y = MAX_SPEED * deltaDivided;
        }
        if (isInputPressed("left")) {
            inputVec.x += -1;
            myTank.vel.x = -MAX_SPEED * deltaDivided;
        }
        else if (isInputPressed("right")) {
            inputVec.x += 1;
            myTank.vel.x = MAX_SPEED * deltaDivided;
        }
        if (inputVec.x != 0 || inputVec.y != 0) {
            //inputVec = normalise(inputVec);
        }
        //myTank.vel.x = inputVec.x * MAX_SPEED* deltaDivided
        //myTank.vel.y = inputVec.y * MAX_SPEED * deltaDivided
        myTank.pos.x += myTank.vel.x;
        myTank.pos.y += myTank.vel.y;
        console.log(myTank.pos);
        //apply Transform
        myTank.element.style.transform = assembleMatrix(myTank.pos, myTank.rot, { "x": 10, "y": 10 });
        myTank.vel.x = 0;
        myTank.vel.y = 0;
        previousTime = currentTime;
    }
    function doCollision() {
    }
    function calcBallDistance(_ball1, _ball2) {
        let distance = Math.hypot(_ball1.pos.x - _ball2.pos.x, _ball1.pos.y - _ball2.pos.y);
        //console.log(distance);
        return distance;
    }
    function calcDeltaTime() {
        currentTime = Date.now();
        deltaTime = currentTime - previousTime;
        displayFramerate();
    }
    function displayFramerate() {
        document.getElementById("frameCounter").innerText = String(Math.round(1000 / deltaTime));
    }
    //Math
    function normalise(_vec) {
        let mag = Math.hypot(_vec.x, _vec.y);
        return { "x": _vec.x / mag, "y": _vec.y / mag };
    }
    function randomInt(_min, _max) {
        return _min + Math.floor((_max - _min + 1) * Math.random());
    }
    function assembleMatrix(_translation, _rotation, _scale) {
        const sin = Math.sin(Math.PI * _rotation / 180);
        const cos = Math.cos(Math.PI * _rotation / 180);
        const matrix = [_scale.x * cos, _scale.x * sin, _scale.y * -sin, _scale.y * cos, _translation.x, _translation.y];
        return `matrix(${matrix.toString()})`;
    }
    function handleResize() {
        viewPortDimensions = { "x": window.innerWidth, "y": window.innerHeight };
    }
    function removeTank(_tankToRemove) {
        for (let tank of tankList) {
            if (tank["element"] == _tankToRemove) {
                tankList.splice(tankList.indexOf(tank), 1);
            }
        }
        _tankToRemove.remove();
    }
    function randomColour() {
        return `rgb(${randomInt(20, 255)},${randomInt(20, 255)},${randomInt(20, 255)})`;
    }
    //Input
    function isInputPressed(_action) {
        const keyTyped = _action;
        return activeInputs.includes(inputMap[keyTyped]);
    }
    function handleKeyDown(_event) {
        if (registeredInputs.includes(_event.key) && !activeInputs.includes(_event.key)) {
            activeInputs.push(_event.key);
        }
    }
    function handleKeyUp(_event) {
        activeInputs.splice(activeInputs.indexOf(_event.key), 1);
    }
    function pollInputs() {
        //console.log(activeInputs);
        return activeInputs;
    }
    function createRegisteredInputList() {
        let key;
        for (key in inputMap) {
            registeredInputs.push(inputMap[key]);
        }
    }
})(movingObjects || (movingObjects = {}));
//# sourceMappingURL=movingObjectsInput.js.map