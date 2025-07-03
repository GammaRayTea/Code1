"use strict";
var diceSim;
(function (diceSim) {
    let globalSum;
    let globalMaxRoll;
    let globalMinRoll;
    let globalAverage;
    let globalMedian;
    let listOfMedians;
    let rollsSimulated;
    initialise();
    function initialise() {
        globalSum = 0;
        globalMaxRoll = 0;
        globalMinRoll = 0;
        globalAverage = 0;
        globalMedian = 0;
        listOfMedians = [];
        rollsSimulated = 0;
        mainLoop();
    }
    function mainLoop() {
        let rollInstructions = inputRollInstructions();
        let rollAmount = inputRollAmountAndValidate();
    }
    function inputRollInstructions() {
        let input = prompt("Please Enter the rolls to execute. \n " +
            "They should be in the format \n " +
            "[amount]d[dice type], [amount]d[dice type],... \n" +
            "example: 1d4, 5d6, 3d12");
        return validateInstructions(parseInstructions(input));
    }
    function validateInstructions(_parsedInstructions) {
    }
    function parseInstructions(_packedInstructions) {
        if (_packedInstructions == null) {
            return null;
        }
        else
            : {
                let parsedInstructions;
                parsedInstructions = _packedInstructions.split(",");
                console.log(parsedInstructions);
                return parsedInstructions;
            }
    }
    function inputRollAmountAndValidate() {
        let input = Number(prompt("Please enter the number of times these dice should be thrown"));
        if (input < 1 || Number.isNaN(input)) {
            return null;
        }
        else {
            return input;
        }
    }
})(diceSim || (diceSim = {}));
//# sourceMappingURL=diceSim.js.map