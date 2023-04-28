class TicTacToe {
    public newGameButton: HTMLElement;
    public board: Array<Array<any>>;
    public currentPlayer: string;
    public element: HTMLDivElement;
    public isGameEnded: boolean;

    constructor(board: Array<Array<any>>, currentPlayer: string, element: HTMLDivElement, newGameButton: HTMLElement, isGameEnded: boolean) {
        this.board = board;
        this.currentPlayer = currentPlayer;
        this.element = element;
        this.isGameEnded = isGameEnded;
        this.newGameButton = newGameButton;

        // events
        this.element.addEventListener("click", (e: Event): void => {
            this.handlePlayerClick(e);
        });
    }

    switchPlayer(): void {

        if (this.currentPlayer === "X")
            this.currentPlayer = "O";
        else
            this.currentPlayer = "X";

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

            // increment count to subtract from row length and get next element of secondary diagonal
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

    expandMark(element: HTMLElement): void {
        element.style.animation = "fade-in .3s ease-in";
    }

    // place the current players mark on click, and calls the render method,
    // and switches the player
    handlePlayerClick(e: Event): void {
        const element = e.target as HTMLElement;
        const row = parseFloat(element.getAttribute("row") as string);
        const col = parseFloat(element.getAttribute("col") as string);
        const coordinates = [row, col];

        // apply an expand animation to player mark
        this.expandMark(element);

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
            this.startOver();
        }

        this.switchPlayer();
    }

    bindEvent(event: string, element: HTMLElement, method: (params?: any) => void): void {
        element.addEventListener(event, (): void => {
            method();
        });
    }

    // checks if the row, col indices are in bounds or not
    isValid(coordinates: Array<number>): boolean {
        const [x, y] = coordinates;

        if (x < 0 || y < 0) {
            return false;
        }

        if (y > this.board.length - 1 || x > this.board.length - 1) {
            return false;
        }

        return true;
    }


    render(board: Array<Array<any>>): void {

        this.element.innerHTML = "";

        for (let i = 0; i < board.length; i++) {

            for (let j = 0; j < board.length; j++) {
                const p = document.createElement("p");
                const cell = document.createElement("li");

                cell.setAttribute("class", "cell");
                cell.setAttribute("row", i.toString());
                cell.setAttribute("col", j.toString());
                p.innerHTML = this.board[i][j];
                cell.appendChild(p);

                // add event listener to each cell
                

                // append element to entry point
                this.element.append(cell);
            }
        }
    }

    startOver(): void {

        this.isGameEnded = true;

        this.board = TicTacToe.newGame(this.board.length);

        this.appendGameBoard();

        this.removeEvent("click", this.startOver);
    }

    removeEvent(event: string, method: (param?: any) => void): void {
        this.newGameButton.removeEventListener(event, method);
    }

    appendGameBoard(): void {
        const newGameBoard = document.createElement("div");

        newGameBoard.classList.add("game-container");

        // create tiles
        for (let i = 0; i < this.board.length; i++) {

            for (let j = 0; j < this.board.length; j++) {
                const p = document.createElement("p");
                const cell = document.createElement("li");
                const mark = this.board[i][j];

                cell.setAttribute("class", "cell");
                cell.setAttribute("row", i.toString());
                cell.setAttribute("col", j.toString());
                p.innerHTML = mark;
                cell.appendChild(p);

                newGameBoard.append(cell);
            }
        }

        this.element.parentNode?.appendChild(newGameBoard);

        // start new instance of tic-tac-toe
        new TicTacToe(TicTacToe.newGame(this.board.length), "X", newGameBoard, this.newGameButton, false);
    }

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

function main(element: HTMLDivElement, newGameButton: HTMLElement, n: number): void {
    const board = TicTacToe.newGame(n);

    const ticTacToe = new TicTacToe(board, "X", element, newGameButton, false);

    console.log(ticTacToe);

    ticTacToe.render(board);

    ticTacToe.bindEvent("click", newGameButton, (): void => {
        ticTacToe.startOver();
    });
}