"use strict";
var Quiz;
(function (Quiz) {
    Quiz.questions = [
        //--Single Choice ("SC") Questions--
        { "type": "SC", "questionText": "This is a single choice question", "answerData": true },
        //--Multiple Choice ("MC") Questions--
        // In "answerData", there is an array with the texts of all answers and an array containing the corresponding letters of the correct ones. 
        // There may also be mutliple correct answers with the amount of false answers decreasing proportionally. 
        // There must be exactly 4 answers in total. 
        { "type": "MC", "questionText": "This is a multiple choice question", "answerData": { "answers": ["correct", "false1", "false2", "false3"], "correct": ["A"] } },
        //Text Entry ("TE") Questions--
        //answerData contains an Array with different possible spellings of the correct answer
        { "type": "TE", "questionText": "This is a text entry choice question", "answerData": ["ok", "Ok", "OK", "Okay", "okay"] },
        //--Estimation ("ES") Questions--
        //answerdata contains an array with the first entry being the correct answer and the second entry being a margin.
        //Entering an answer that is within + or - the margin of the correct answer will count as a correct answer
        { "type": "ES", "questionText": "This is an estimation choice question", "answerData": [30.0, 5.0] },
    ];
})(Quiz || (Quiz = {}));
//# sourceMappingURL=questionData.js.map