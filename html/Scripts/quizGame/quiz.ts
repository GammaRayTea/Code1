


namespace Quiz {
    let questionNr: number;
    let currentQText: string;
    let currentQType: string;
    let currentAnswerData: any;
    initialise();




    function initialise() {
        questionNr = 0;

        mainLoop();
    }




    function mainLoop() {
        
        queryQuestion();
        matchQuestionType();


    }




    function queryQuestion() {
        let currentQuestion = questions[questionNr]
        currentQText = currentQuestion.questionText;
        currentAnswerData = currentQuestion.answerData;
        currentQType = currentQuestion.type;
        

    }




    function matchQuestionType() {


        let textToDisplay: string;
        let input: string | null;
        textToDisplay = currentQText + "\n";


        switch (currentQType) {

            case "SC": { //Single Choice
                askSingleChoice();
                matchQuestionType()
                break;
            }

            case "MC": { //Multiple Choice
                
                askMultipleChoice();
                break;
            }

            case "TE": { //Text Entry

                textToDisplay += "Enter the answer.";
                break;
            }

            case "ES": { //Estimation

                textToDisplay += "Enter a number that you think is close to the answer.";
                break;
            }

        }

        //flush cached question
    }




    function inferSingleChoiceInput(_input: string | null) {
        let possibleTrueSpellings: string[] = ["TRUE", "YES", "CORRECT"];
        let possibleFalseSpellings: string[] = ["FALSE", "NO", "INCORRECT", "WRONG"];
        if (_input == null) {
            return null;
        }
        else if (possibleTrueSpellings.includes(_input.toUpperCase())) {
            return true;
        }
        else if (possibleFalseSpellings.includes(_input.toUpperCase())) {
            return false;
        }
        else {
            return null
        }

    }




    function validateMultipleChoiceAnswer(_input: string | null, _correctLetters: string[]): boolean | null {
        let letterList: string[]= ["A","B","C","D"]
        
        if (_input == null) {
            return null
        }
        else if (_correctLetters.includes(_input.toUpperCase())) {
            return true;
        }
        else if (letterList.includes(_input.toUpperCase())) {
            return false
        }
        else {
            return null;
        }


    }



    function askSingleChoice() {
        let textToDisplay: string = currentQText + "\n" + "True or False?";
        let input: string | null = prompt(textToDisplay);
        let validatedInput: boolean | null = inferSingleChoiceInput(input);


        if (validatedInput == null) {
            alert("Input valid answer!")
            matchQuestionType()
        }

        else if (currentAnswerData == validatedInput) {
            alert("That's Correct.")
            onCorrectAnswer();
        }
        else if (!currentAnswerData == validatedInput) {
            alert("That's false. Try Again.")
            matchQuestionType()
        }


    }




    function askMultipleChoice() {
        let textToDisplay: string = currentQText + "\n";
        let answerInformation:string[] = getMCAnswerLetters();
        console.log(answerInformation)
        textToDisplay += (
            "Choose the correct answer:" + "\n" +
            assembleMCAnswers()
        );
        let input: string | null = prompt(textToDisplay);
        let validatedInput: boolean | null = validateMultipleChoiceAnswer(input, answerInformation);


        if (validatedInput == null) {
            alert("Input valid answer!");
            matchQuestionType();
        }
        else if (validatedInput) {
            alert("That's Correct.");
            onCorrectAnswer();
        }
        else {
            alert("That's false. Try Again.");
            matchQuestionType();
        }
    }




    function askTextEntry() {

    }




    function askEstimation() {

    }




    function onCorrectAnswer() {
        questionNr++;
        mainLoop();
    }


    function assembleMCAnswers(): string {

        let assembledAnswers: string = (
            "A:" + currentAnswerData.answers[0] + "\n" +
            "B:" + currentAnswerData.answers[1] + "\n" +
            "C:" + currentAnswerData.answers[2] + "\n" +
            "D:" + currentAnswerData.answers[3] + "\n"
        );

        
        return assembledAnswers;
    }

    function getMCAnswerLetters(): string[]{
        let correctLetters: string[] = [];
       
        if (currentAnswerData.correct.includes("D")){
            correctLetters.push("D")
            

        }
        if (currentAnswerData.correct.includes("C")){
            correctLetters.push("C")
            

        }
        if (currentAnswerData.correct.includes("B")){
            correctLetters.push("B")
            

        }
        if (currentAnswerData.correct.includes("A")){
            
            correctLetters.push("A")

        }
        return correctLetters


    }

}