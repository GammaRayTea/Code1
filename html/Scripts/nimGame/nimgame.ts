namespace NimGame {


    let activePlayer: boolean = true;
    let row1: number;
    let row2: number;
    let row3: number;
    let row4: number;


    fillRows();
    mainLoop();

    function mainLoop() {
        displayState();
        subtractAmountFromRow(askRowNumber());
        if (checkWin()) {
            displayWinner();
        }
        else {
            changePlayer()
            mainLoop();
        }
    }




    function fillRows() {
        row1 = Number(prompt("Input starting value for row 1"));
        row2 = Number(prompt("Input starting value for row 2"));
        row3 = Number(prompt("Input starting value for row 3"));
        row4 = Number(prompt("Input starting value for row 4"));
    }

    function subtractAmountFromRow(_row: number) {
        if (isRowValid(_row)) {

            console.log(_row)
            let amount: number;
            amount = Number(prompt(createGameStateInfo() + "\n" + "Input amount to take"))

            switch (_row) {
                case 1:
                    if (isAmountValid(amount, row1)) {
                        row1 = row1 - amount;
                        break;
                    }
                    else {
                        subtractAmountFromRow(_row);
                        break;
                    }
                    

                case 2:
                    if (isAmountValid(amount, row2)) {
                        row2 = row2 - amount;
                        break;
                    }
                    else {
                        subtractAmountFromRow(_row);
                        break;
                    }
                    

                case 3:
                    if (isAmountValid(amount, row3)) {
                        row3 = row3 - amount;
                        break;
                    }
                    else {
                        subtractAmountFromRow(_row);
                        break;
                    }
                    

                case 4:
                    if (isAmountValid(amount, row4)) {
                        row4 = row4 - amount;
                        break;
                    }
                    else {
                        subtractAmountFromRow(_row);
                        break;
                    }
                    
            }
            
        }
        else {
            alert("Pick a valid row!")
            subtractAmountFromRow(askRowNumber())
        }
    }



    function displayState() {
        let playerTurnMessage: String
        if (activePlayer == true) {
            playerTurnMessage = "Player 1's turn";
        }
        else {
            playerTurnMessage = "Player 2's turn";
        }
        alert(
            createGameStateInfo() +
            playerTurnMessage
        );
    }


    function createGameStateInfo(): string {
        return (
            "Left in row 1: " + String(row1) + "\n" +
            "Left in row 2: " + String(row2) + "\n" +
            "Left in row 3: " + String(row3) + "\n" +
            "Left in row 4: " + String(row4) + "\n" + " \n"
        );
    }

    function askRowNumber(): number {

        return Number(prompt("Input row number"));

    }




    function checkWin(): boolean {

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
    function isRowValid(_row: number): boolean {
        if ((_row > 4) || _row < 0) {
            return false;
        }
        else {
            return true;
        }
    }
    function isAmountValid(_amount: number, _row: number): boolean {
        if ((_amount > _row) || (_amount < 1)) {
            alert("Pick a valid amount!")
            
            return false;
        }
        else {
            return true;
        }
    }

}

















