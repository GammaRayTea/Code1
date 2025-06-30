namespace NimGame {


    let activePlayer: boolean;
    let rows: number[];
    initalise();

    

    
    function initalise(){
        activePlayer = true;
        rows= [0, 0, 0, 0]
        fillRows();
        mainLoop();
    }




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
        rows[0] = Number(prompt("Input starting value for row 1"));
        rows[1] = Number(prompt("Input starting value for row 2"));
        rows[2] = Number(prompt("Input starting value for row 3"));
        rows[3] = Number(prompt("Input starting value for row 4"));
    }




    function subtractAmountFromRow(_row: number) {
        if (isRowValid(_row)) {


            let amount: number;
            amount = Number(prompt(createGameStateInfo() + "\n" + "Input amount to take"))

            if (isAmountValid(amount, rows[_row - 1])) {
                rows[_row-1] = rows[_row-1] - amount;
                
            }
            else {
                subtractAmountFromRow(_row);
            }

        }
        else {
            alert("Pick a valid row!")
            subtractAmountFromRow(askRowNumber());
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
            "Left in row 1: " + String(rows[0]) + "\n" +
            "Left in row 2: " + String(rows[1]) + "\n" +
            "Left in row 3: " + String(rows[2]) + "\n" +
            "Left in row 4: " + String(rows[3]) + "\n" + " \n"
        );
    }




    function askRowNumber(): number {

        return Number(prompt("Input row number"));

    }





    function checkWin(): boolean {

        if (rows[0] + rows[1] + rows[2] + rows[3] == 0) {
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
        console.log(_row)
        console.log(rows[_row - 1])
        
        if ((_row > 4) || (_row < 1) || (Number.isNaN(_row))) {
            return false;

        }
        else if (rows[_row - 1] == 0) {
            console.log(rows[_row - 1]);
            return false;
        }
        else {
            return true;
        }
    }




    function isAmountValid(_amount: number, _row: number): boolean {
        if ((_amount > _row) || (_amount < 1) || ((Number.isNaN(_amount)))) {
            alert("Pick a valid amount!");

            return false;
        }
        else {
            return true;
        }
    }
}

















