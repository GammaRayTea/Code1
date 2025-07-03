namespace diceSim {
    let globalSum: number;
    let globalMaxRoll: number;
    let globalMinRoll: number;
    let globalAverage: number;
    let globalMedian: number;
    let listOfMedians: number[];
    let rollsSimulated: number;


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
        let rollInstructions: string | null = inputRollInstructions();
        let rollAmount: number | null = inputRollAmountAndValidate();


    }

    function inputRollInstructions() :string | null {
        let input:string | null = prompt(
            "Please Enter the rolls to execute. \n " +
            "They should be in the format \n " +
            "[amount]d[dice type], [amount]d[dice type],... \n" +
            "example: 1d4, 5d6, 3d12"
        );
        return validateInstructions(parseInstructions(input));
    }

    function validateInstructions(_parsedInstructions:string[] | null){

    }


    function parseInstructions(_packedInstructions:string | null) :string[] | null{
        if (_packedInstructions == null){
            return null
        }
        else: {
            let parsedInstructions:string[];
            parsedInstructions = _packedInstructions.split(",");
            console.log(parsedInstructions);
            return parsedInstructions;

        }
        

        
    }
    function inputRollAmountAndValidate() {
        let input: number = Number(prompt("Please enter the number of times these dice should be thrown"));

        if (input < 1 || Number.isNaN(input)) {
            return null
        }
        else {
            return input;

        }
    }




}