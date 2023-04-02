
interface TicTacToeGame {

}



class TicTacToe {

    public board: Array<Array<any>>;
    public currentPlayer: string;
    public element: HTMLDivElement;
    public isGameEnded: boolean;

    constructor(board: Array<Array<any>>, currentPlayer: string, element: HTMLDivElement, isGameEnded: boolean) {
        this.board = board;
        this.currentPlayer = currentPlayer;
        this.element = element;
        this.isGameEnded = isGameEnded;

        // events
        this.element.addEventListener("click", (e: Event): void => {
            this.handlePlayerClick(e);
        });
    }

    switchPlayer(): void {
        if (this.currentPlayer === "X") {
            this.currentPlayer = "O";
        } else {
            this.currentPlayer = "X";
        }
    }

    isWinRow(): boolean {
        for (let i = 0; i < this.board.length; i++) {

            const won = this.board[i].every((ele: string): boolean => {
                return ele === this.currentPlayer;
            });

            if (won)
                return true;
        }

        return false;
    }

    isWinColumn(): boolean {

        for (let i = 0; i < this.board.length; i++) {

            const array: Array<string> = [];

            for (let j = 0; j < this.board.length; j++) {
                array.push(this.board[j][i]);
            }

            const won = array.every((ele: string): boolean => {
                return ele === this.currentPlayer;
            });

            if (won)
                return true;
        }

        return false;
    }

    isWinDiagonal(): boolean {

        const main: Array<string> = [];
        const secondary: Array<string> = [];
        let count = 1;

        for (let i = 0; i < this.board.length; i++) {

            for (let j = 0; j < this.board.length; j++) {

                if (i === j) {
                    main.push(this.board[i][j]);
                }
            }

            secondary.push(this.board[i][this.board[i].length - count]);

            // increment count to subtract and get next element of secondary diagonal
            count++;
        }

        const wonMain = main.every((ele: string): boolean => {
            return ele === this.currentPlayer;
        });

        const wonSecondary = secondary.every((ele: string): boolean => {
            return ele === this.currentPlayer;
        });

        if (wonMain || wonSecondary) {
            return true;
        }

        return false;
    }

    // place the current players mark on click, and call the render method,
    // and switches the player
    handlePlayerClick(e: Event): void {

        const element = e.target as HTMLElement;
        const row = parseFloat(element.getAttribute("row") as string);
        const col = parseFloat(element.getAttribute("col") as string);
        const coordinates = [row, col];

        // if the player clicks on a cell after the game has ended,
        // clear the board before clicking, and start a new game
        if (this.isGameEnded) {
            this.isGameEnded = false;
        }

        if (this.isValid(coordinates)) {
            const [x, y] = coordinates;

            if (this.board[row][col] === "") {

                if (this.currentPlayer === "X") {

                    this.board[x][y] = "X";
                } else {
                    this.board[x][y] = "O";
                }
            } else {
                alert("space already taken");
                return;
            }
        }

        // re-render the game board to update the HTML
        this.render(this.board);

        if (this.isWinColumn() || this.isWinDiagonal() || this.isWinRow()) {
            alert(`player ${this.currentPlayer} has won the game`);
            this.isGameEnded = true;
            this.board = TicTacToe.newGame(this.board.length);
        }

        this.switchPlayer();

        console.log(this);
    }

    // checks if the row, col indices are in bounds or not
    isValid(coordinates: Array<number | string>): boolean {

        const [x, y] = coordinates;

        if (x < 0 || y < 0) {
            return false;
        }

        if (y > this.board.length - 1 || x > this.board.length - 1) {
            return false;
        }

        return true;
    }


    // renders the board as valid HTML
    render(board: Array<Array<any>>): void {

        this.element.innerHTML = "";

        // loop through the current instance of board 
        for (let i = 0; i < board.length; i++) {

            for (let j = 0; j < board.length; j++) {

                const p = document.createElement("p");
                const cell = document.createElement("li");

                cell.setAttribute("class", "cell");
                cell.setAttribute("row", i.toString());
                cell.setAttribute("col", j.toString());
                p.innerHTML = this.board[i][j];
                cell.appendChild(p);

                // append element to entry point
                this.element.append(cell);
            }
        }
    }

    // creates a n * n 2D array as the game board
    static newGame(n: number): Array<Array<any>> {

        const array: Array<Array<any>> = [];

        for (let i = 0; i < n; i++) {

            array.push(new Array());

            for (let j = 0; j < n; j++) {
                array[i].push("");
            }
        }

        return array;
    }
}

function main(element: HTMLDivElement, n: number): void {

    const board = TicTacToe.newGame(n);

    const ticTacToe = new TicTacToe(board, "X", element, false);

    console.log(ticTacToe);

    ticTacToe.render(board);
}