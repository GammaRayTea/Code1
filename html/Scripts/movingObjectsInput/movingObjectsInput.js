"use strict";
var movingObjects;
(function (movingObjects) {
    const tankList = [];
    let Input = {};
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
        setInterval(physicsProcess, 16.6666);
    }
    function physicsProcess() {
        calcDeltaTime();
        movement();
        doCollision();
    }
    function movement() {
        let deltaDivided = deltaTime / 1000;
        myTank.rot += 1;
        myTank.element.style.transform = assembleMatrix(myTank.pos, myTank.rot, { "x": 10, "y": 20 });
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
        console.log(viewPortDimensions);
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
    //Input polling
    function handleKeyDown(_event) {
    }
    function handleKeyUp(_event) {
    }
    function pollInputs() {
    }
})(movingObjects || (movingObjects = {}));
//# sourceMappingURL=movingObjectsInput.js.map