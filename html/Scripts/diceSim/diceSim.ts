
namespace diceSim {
    let globalSum: number;
    let globalMaxRoll: number;
    let globalMinRoll: number;
    let globalAverage: number;
    let globalMedian: number;
    let listOfMedians: number[];
    let rollsSimulated: number;
    let cachedRollInstructions: string | null;

    initialise();




    function initialise() {

        globalSum = 0;
        globalMaxRoll = 0;
        globalMinRoll = 0;
        globalAverage = 0;
        globalMedian = 0;
        listOfMedians = [];
        rollsSimulated = 0;

        mainLoop(true);
    }




    function mainLoop(_reset: boolean) {
        let rollInstructions: string | null;
        if (_reset) {
            rollInstructions = inputRollInstructions();
            cachedRollInstructions = rollInstructions;
        }
        else {
            rollInstructions = cachedRollInstructions;
        }

        let rollAmount: number | null = inputRollAmountAndValidate();
        rollLoop(rollInstructions, rollAmount);
    }




    function rollLoop(_rollInstructions: string | null, _rollAmount: number | null) {

        let validatedInstructions = parseInstructions(_rollInstructions);
        //console.log(validatedInstructions);
        if (validatedInstructions == null) {
            onValidationFailed("rollInstructions");
        }
        else if (_rollAmount == null) {
            onValidationFailed("rollAmount");

        }
        else {

            rollsSimulated += _rollAmount;
            let currentListOfSums: number[] = [];
            while (_rollAmount > 0) {
                let rollResult: number = simulateRoll(validatedInstructions);
                currentListOfSums.push(rollResult);
                updateStats(rollResult);
                _rollAmount--;

            }
            globalMedian = chooseGlobalMedian(currentListOfSums);
            displayStats();

        }
    }



    //input and parsing
    function inputRollInstructions(): string | null {
        let input: string | null = prompt(
            "Please Enter the rolls to execute. \n " +
            "They should be in the format \n " +
            "[amount]d[dice type], [amount]d[dice type],... \n" +
            "example: 1d4, 5d6, 3d12"
        );
        return input;
    }




    function inputRollAmountAndValidate() {
        let input: number = Number(prompt("Please enter the number of times these dice should be thrown"));

        if (input < 1 || Number.isNaN(input) || Number.isInteger(input) == false) {
            return null;
        }
        else {
            return input;

        }
    }




    function parseInstructions(_packedInstructions: string | null): number[][] | null {
        if (_packedInstructions == null) {
            return null
        }
        else {
            let parsedInstructions = [];
            let splitInstructions: string[] = _packedInstructions.replaceAll(" ", "").split(",");
            // console.log(_packedInstructions.replaceAll(" ", ""))
            // console.log(splitInstructions);
            for (let instruction of splitInstructions) {

                let validatedStep = validateInstructionStep(instruction);
                if (validatedStep[1]) {
                    parsedInstructions.push(validatedStep[0]);
                }
                else {
                    return null;
                }
            }
            return parsedInstructions;
        }
    }



    //validation
    function validateInstructionStep(_instruction: string): [step: number[], valid: boolean] {
        let splitInstrucion: any[];
        let finalInstructions: number[] = [];

        if (_instruction.includes("d")) {
            splitInstrucion = _instruction.split("d");

            for (var value of splitInstrucion) {

                value = Number(value);
                if (Number.isNaN(value) || !Number.isInteger(value)) {
                    console.log("not number or integer");
                    return [[], false];
                }
                else {
                    finalInstructions.push(value);
                }
            }
            return [finalInstructions, true];

        }
        else {
            console.log("no d");
            return [[], false];

        }
    }








    function onValidationFailed(_reason: string) {
        switch (_reason) {
            case "rollAmount": {
                console.log("roll amount invalid");
                mainLoop(true);
                break;
            }
            case "rollInstructions": {
                console.log("roll instr invalid");
                mainLoop(true);
                break;
            }
        }
    }




    //simulation
    function simulateRoll(_rollInstructions: number[][]): number {
        let currentRollSum: number = 0;

        for (var instruction of _rollInstructions) {
            for (let i = 0; i < instruction[0]; i++) { //roll mulitple of same die
                currentRollSum += randomInt(1, instruction[1]); //add result of one die to sum of rolled dice
            }

        }
        return currentRollSum;



        function randomInt(min: number, max: number) {
            return min + Math.floor((max - min + 1) * Math.random());
        }
    }

    //statistics


    function updateStats(_currentRollSum: number) {
        globalSum += _currentRollSum;



        globalMaxRoll = compareMaxRoll(_currentRollSum);
        globalMinRoll = compareMinRoll(_currentRollSum);
        globalAverage = calculateAverage(_currentRollSum);
        globalMedian = 0;
        listOfMedians = [];
    }




    function compareMaxRoll(_currentRollSum: number) {
        if (globalMaxRoll < _currentRollSum) {
            return _currentRollSum;
        }
        else {
            return globalMaxRoll;
        }
    }




    function compareMinRoll(_currentRollSum: number) {
        if (globalMinRoll > _currentRollSum || globalMinRoll ==0) {
            return _currentRollSum;
        }
        else {
            return globalMinRoll;
        }
    }




    function calculateAverage(_currentRollSum: number): number {
        if (globalAverage == 0) {
            return _currentRollSum;
        }
        else {
            return (globalAverage + _currentRollSum) / 2
        }
    }




    function chooseGlobalMedian(_listOfSums: number[]) {
        if (globalMedian == 0) {
            let median = calculateMedian(_listOfSums);
            listOfMedians.push(median);
            return median;
        }
        else {
            listOfMedians.push(calculateMedian(_listOfSums));
            return calculateMedian(listOfMedians);
        }





        function calculateMedian(_numbersToSort: number[]): number {

            var half = Math.floor(_numbersToSort.length / 2);
            _numbersToSort.sort(function (a, b) { return a - b; });

            if (_numbersToSort.length % 2) {
                return _numbersToSort[half];
            } else {
                return (_numbersToSort[half - 1] + _numbersToSort[half]) / 2.0;
            }

        }
    }




    function displayStats() {
        alert(`
            The sum of all simulated rolls with the selected dice is ${globalSum}.
            The average is ${globalAverage}.
            The median sum is ${globalMedian}.
            The highest recorded roll ist ${globalMaxRoll}.
            The lowest recorded roll ist ${globalMinRoll}.
            ${rollsSimulated} roll(s) with the selected dice have been simulated.
            `);
        askReset();
    }




    function askReset() {
        let resetInput = Number(prompt("Would you like to (1)reset, (2)reroll the same dice or (3)end."));
        if (Number.isNaN(resetInput)) {
            alert("select a valid option");
            askReset()
        }
        else {

            switch (resetInput) {
                case 1: {
                    initialise();
                    break;
                }
                case 2: {
                    mainLoop(false);
                    break;
                }
                case 3: {
                    break;
                }
                default: {
                    alert("select a valid option");
                    askReset()
                }

            }
        }




    }
}