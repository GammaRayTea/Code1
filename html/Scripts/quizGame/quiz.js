"use strict";
var Quiz;
(function (Quiz) {
    let questionNr;
    let currentQText;
    let currentQType;
    let currentAnswerData;
    initialise();
    function initialise() {
        questionNr = 0;
        mainLoop();
    }
    function mainLoop() {
        console.log(questionNr);
        queryQuestion();
        matchQuestionType();
    }
    function queryQuestion() {
        let currentQuestion = Quiz.questions[questionNr];
        currentQText = currentQuestion.questionText;
        currentAnswerData = currentQuestion.answerData;
        currentQType = currentQuestion.type;
        console.log(currentQuestion);
    }
    function matchQuestionType() {
        let textToDisplay;
        let input;
        textToDisplay = currentQText + "\n";
        switch (currentQType) {
            case "SC": { //Single Choice
                askSingleChoice();
                matchQuestionType();
                break;
            }
            case "MC": { //Multiple Choice
                console.log("reached switch");
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
    function inferSingleChoiceInput(_input) {
        let possibleTrueSpellings = ["TRUE", "YES", "CORRECT"];
        let possibleFalseSpellings = ["FALSE", "NO", "INCORRECT", "WRONG"];
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
            return null;
        }
    }
    function validateMultipleChoiceAnswer(_input, _correctLetters, _falseLetters) {
        if (_input == null) {
            return null;
        }
        else if (_correctLetters.includes(_input.toUpperCase())) {
            return true;
        }
        else if (_falseLetters.includes(_input.toUpperCase())) {
            return false;
        }
        else {
            return null;
        }
    }
    function askSingleChoice() {
        let textToDisplay = currentQText + "\n" + "True or False?";
        let input = prompt(textToDisplay);
        let validatedInput = inferSingleChoiceInput(input);
        if (validatedInput == null) {
            alert("Input valid answer!");
            matchQuestionType();
        }
        else if (currentAnswerData == validatedInput) {
            alert("That's Correct.");
            onCorrectAnswer();
        }
        else if (!currentAnswerData == validatedInput) {
            alert("That's false. Try Again.");
            matchQuestionType();
        }
    }
    function askMultipleChoice() {
        let textToDisplay = currentQText + "\n";
        let answerInformation = getMCAnswerTypes();
        textToDisplay += ("Choose the correct answer:" + "\n" +
            assembleMCAnswers(answerInformation[1]));
        let input = prompt(textToDisplay);
        let validatedInput = validateMultipleChoiceAnswer(input, answerInformation[0], answerInformation[2]);
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
    function assembleMCAnswers(_falseAnswerAmount) {
        let assembledAnswers = "";
        if (_falseAnswerAmount == 3) {
            assembledAnswers = ("A:" + currentAnswerData.c1 + "\n" +
                "B:" + currentAnswerData.f1 + "\n" +
                "C:" + currentAnswerData.f2 + "\n" +
                "D:" + currentAnswerData.f3 + "\n");
        }
        else if (_falseAnswerAmount == 2) {
            assembledAnswers = ("A:" + currentAnswerData.c1 + "\n" +
                "B:" + currentAnswerData.c2 + "\n" +
                "C:" + currentAnswerData.f1 + "\n" +
                "D:" + currentAnswerData.f2 + "\n");
        }
        else if (_falseAnswerAmount == 1) {
            assembledAnswers = ("A:" + currentAnswerData.c1 + "\n" +
                "B:" + currentAnswerData.c2 + "\n" +
                "C:" + currentAnswerData.c3 + "\n" +
                "D:" + currentAnswerData.f1 + "\n");
        }
        console.log("assembled Answers");
        return assembledAnswers;
    }
    function getMCAnswerTypes() {
        let correctLetters;
        let falseLetters;
        let falseAnswerAmount;
        if (currentAnswerData.f3) {
            correctLetters = ["A", "B", "C"];
            falseLetters = ["D"];
            falseAnswerAmount = 3;
        }
        else if (currentAnswerData.f2) {
            correctLetters = ["A", "B"];
            falseLetters = ["C", "D"];
            falseAnswerAmount = 2;
        }
        else {
            correctLetters = ["A"];
            falseLetters = ["B", "C", "D"];
            falseAnswerAmount = 1;
        }
        return [correctLetters, falseAnswerAmount, falseLetters];
    }
})(Quiz || (Quiz = {}));
//# sourceMappingURL=quiz.js.map