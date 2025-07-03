"use strict";
var eventPractice;
(function (eventPractice) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        document.addEventListener("mousemove", handleMouseMovement);
        let divs = document.getElementsByClassName("blueBox");
    }
    function handleMouseMovement(_event) {
    }
})(eventPractice || (eventPractice = {}));
//# sourceMappingURL=eventIntroduction.js.map