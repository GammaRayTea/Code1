"use strict";
var eventPractice;
(function (eventPractice) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        document.addEventListener("mousemove", handleMouseMovement);
        document.addEventListener("keyup", handleKeyup);
        document.body.addEventListener("click", handleClick);
        document.body.addEventListener("keyup", handleKeyup);
        let divs = document.getElementsByClassName("blueBox");
        for (var value of divs) {
            console.log(value);
            value.addEventListener("click", handleClick);
            value.addEventListener("keyup", handleKeyup);
        }
    }
    function handleMouseMovement(_event) {
        setInfoBox(_event);
    }
    function handleClick(_event) {
        logInfo(_event);
    }
    function handleKeyup(_event) {
        logInfo(_event);
    }
    function setInfoBox(_event) {
        let position = [_event.clientX, _event.clientY];
        let infoBox = document.getElementById("infoBox");
        infoBox.style.left = `${position[0] + 20}px`;
        infoBox.style.top = `${position[1] + 20}px`;
        infoBox.innerText = (`position = ${position[0]},${position[1]}
            target = ${_event.target}`);
    }
    function logInfo(_event) {
        console.log(`type = ${_event.type}
target = ${_event.target}
currentTarget = ${_event.currentTarget}
event Object = ${_event}
            `);
    }
})(eventPractice || (eventPractice = {}));
//# sourceMappingURL=eventIntroduction.js.map