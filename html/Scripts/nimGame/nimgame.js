"use strict";
var NimGame;
(function (NimGame) {
    let activePlayer = true;
    let row1;
    let row2;
    let row3;
    let row4;
    fillRows();
    mainLoop();
    function mainLoop() {
        displayState();
        subtractAmountFromRow(askRowNumber());
        if (checkWin()) {
            displayWinner();
        }
        else {
            changePlayer();
            mainLoop();
        }
    }
    function fillRows() {
        row1 = Number(prompt("Input starting value for row 1"));
        row2 = Number(prompt("Input starting value for row 2"));
        row3 = Number(prompt("Input starting value for row 3"));
        row4 = Number(prompt("Input starting value for row 4"));
    }
    function subtractAmountFromRow(_row) {
        if (isRowValid(_row)) {
            console.log(_row);
            let amount;
            amount = Number(prompt(createGameStateInfo() + "\n" + "Input amount to take"));
            switch (_row) {
                case 1:
                    if (isAmountValid(amount, row1)) {
                        row1 = row1 - amount;
                    }
                    else {
                        subtractAmountFromRow(_row);
                    }
                    break;
                case 2:
                    if (isAmountValid(amount, row2)) {
                        row2 = row2 - amount;
                    }
                    else {
                        subtractAmountFromRow(_row);
                    }
                    break;
                case 3:
                    if (isAmountValid(amount, row3)) {
                        row3 = row3 - amount;
                    }
                    else {
                        subtractAmountFromRow(_row);
                    }
                    break;
                case 4:
                    if (isAmountValid(amount, row4)) {
                        row4 = row4 - amount;
                    }
                    else {
                        subtractAmountFromRow(_row);
                    }
                    break;
            }
        }
        else {
            alert("Pick a valid row!");
            subtractAmountFromRow(askRowNumber());
        }
    }
    function displayState() {
        let playerTurnMessage;
        if (activePlayer == true) {
            playerTurnMessage = "Player 1's turn";
        }
        else {
            playerTurnMessage = "Player 2's turn";
        }
        alert(createGameStateInfo() +
            playerTurnMessage);
    }
    function createGameStateInfo() {
        return ("Left in row 1: " + String(row1) + "\n" +
            "Left in row 2: " + String(row2) + "\n" +
            "Left in row 3: " + String(row3) + "\n" +
            "Left in row 4: " + String(row4) + "\n" + " \n");
    }
    function askRowNumber() {
        return Number(prompt("Input row number"));
    }
    function checkWin() {
        if (row1 + row2 + row3 + row4 == 0) {
            return true;
        }
        else {
            return false;
        }
    }
    function displayWinner() {
        if (activePlayer) {
            alert("Player 2 Wins!");
        }
        else {
            alert("Player 1 Wins!");
        }
    }
    function changePlayer() {
        activePlayer = !activePlayer;
    }
    function isRowValid(_row) {
        if ((_row > 4) || _row < 0) {
            return false;
        }
        else {
            return true;
        }
    }
    function isAmountValid(_amount, _row) {
        if ((_amount > _row) || (_amount < 1)) {
            alert("Pick a valid amount!");
            subtractAmountFromRow(_row);
            return false;
        }
        else {
            return true;
        }
    }
})(NimGame || (NimGame = {}));
//# sourceMappingURL=nimgame.js.map