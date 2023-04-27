var TicTacToe = /** @class */ (function () {
    function TicTacToe(board, currentPlayer, element, newGameButton, isGameEnded) {
        var _this = this;
        this.board = board;
        this.currentPlayer = currentPlayer;
        this.element = element;
        this.isGameEnded = isGameEnded;
        this.newGameButton = newGameButton;
        // events
        this.element.addEventListener("click", function (e) {
            _this.handlePlayerClick(e);
        });
    }
    TicTacToe.prototype.switchPlayer = function () {
        if (this.currentPlayer === "X")
            this.currentPlayer = "O";
        else
            this.currentPlayer = "X";
    };
    TicTacToe.prototype.isWinRow = function () {
        var _this = this;
        for (var i = 0; i < this.board.length; i++) {
            var won = this.board[i].every(function (ele) {
                return ele === _this.currentPlayer;
            });
            if (won)
                return true;
        }
        return false;
    };
    TicTacToe.prototype.isWinColumn = function () {
        var _this = this;
        for (var i = 0; i < this.board.length; i++) {
            var array = [];
            for (var j = 0; j < this.board.length; j++) {
                array.push(this.board[j][i]);
            }
            var won = array.every(function (ele) {
                return ele === _this.currentPlayer;
            });
            if (won)
                return true;
        }
        return false;
    };
    TicTacToe.prototype.isWinDiagonal = function () {
        var _this = this;
        var main = [];
        var secondary = [];
        var count = 1;
        for (var i = 0; i < this.board.length; i++) {
            for (var j = 0; j < this.board.length; j++) {
                if (i === j) {
                    main.push(this.board[i][j]);
                }
            }
            secondary.push(this.board[i][this.board[i].length - count]);
            // increment count to subtract from row length and get next element of secondary diagonal
            count++;
        }
        var wonMain = main.every(function (ele) {
            return ele === _this.currentPlayer;
        });
        var wonSecondary = secondary.every(function (ele) {
            return ele === _this.currentPlayer;
        });
        if (wonMain || wonSecondary) {
            return true;
        }
        return false;
    };
    // place the current players mark on click, and call the render method,
    // and switches the player
    TicTacToe.prototype.handlePlayerClick = function (e) {
        var element = e.target;
        var row = parseFloat(element.getAttribute("row"));
        var col = parseFloat(element.getAttribute("col"));
        var coordinates = [row, col];
        // if the player clicks on a cell after the game has ended,
        // clear the board before clicking, and start a new game
        if (this.isGameEnded) {
            this.isGameEnded = false;
        }
        if (this.isValid(coordinates)) {
            var x = coordinates[0], y = coordinates[1];
            if (this.board[row][col] === "") {
                if (this.currentPlayer === "X") {
                    this.board[x][y] = "X";
                }
                else {
                    this.board[x][y] = "O";
                }
            }
            else {
                alert("space already taken");
                return;
            }
        }
        // re-render the game board to update the HTML
        this.render(this.board);
        if (this.isWinColumn() || this.isWinDiagonal() || this.isWinRow()) {
            alert("player ".concat(this.currentPlayer, " has won the game"));
            this.startOver();
        }
        this.switchPlayer();
        console.log(this);
    };
    TicTacToe.prototype.bindEvent = function (event, element) {
        element.addEventListener(event, function () {
            location.reload();
        });
    };
    // checks if the row, col indices are in bounds or not
    TicTacToe.prototype.isValid = function (coordinates) {
        var x = coordinates[0], y = coordinates[1];
        if (x < 0 || y < 0) {
            return false;
        }
        if (y > this.board.length - 1 || x > this.board.length - 1) {
            return false;
        }
        return true;
    };
    // renders the board as valid HTML
    TicTacToe.prototype.render = function (board) {
        this.bindEvent("click", this.newGameButton);
        this.element.innerHTML = "";
        // loop through the current instance of board 
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board.length; j++) {
                var p = document.createElement("p");
                var cell = document.createElement("li");
                cell.setAttribute("class", "cell");
                cell.setAttribute("row", i.toString());
                cell.setAttribute("col", j.toString());
                p.innerHTML = this.board[i][j];
                cell.appendChild(p);
                // append element to entry point
                this.element.append(cell);
            }
        }
    };
    TicTacToe.prototype.startOver = function () {
        this.isGameEnded = true;
        this.board = TicTacToe.newGame(this.board.length);
        this.appendGameBoard();
        this.removeEvent("click", this.startOver);
    };
    TicTacToe.prototype.removeEvent = function (event, method) {
        this.newGameButton.removeEventListener(event, method);
    };
    TicTacToe.prototype.appendGameBoard = function () {
        var _a;
        var newGameBoard = document.createElement("div");
        newGameBoard.classList.add("game-container");
        // create tiles
        for (var i = 0; i < this.board.length; i++) {
            for (var j = 0; j < this.board.length; j++) {
                var p = document.createElement("p");
                var cell = document.createElement("li");
                cell.setAttribute("class", "cell");
                cell.setAttribute("row", i.toString());
                cell.setAttribute("col", j.toString());
                p.innerHTML = this.board[i][j];
                cell.appendChild(p);
                newGameBoard.append(cell);
            }
        }
        (_a = this.element.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(newGameBoard, this.element.nextSibling);
        // start new instance of tic-tac-toe
        new TicTacToe(TicTacToe.newGame(this.board.length), "X", newGameBoard, this.newGameButton, false);
    };
    TicTacToe.newGame = function (n) {
        var array = [];
        for (var i = 0; i < n; i++) {
            array.push(new Array());
            for (var j = 0; j < n; j++) {
                array[i].push("");
            }
        }
        return array;
    };
    return TicTacToe;
}());
function main(element, newGameButton, n) {
    var board = TicTacToe.newGame(n);
    var ticTacToe = new TicTacToe(board, "X", element, newGameButton, false);
    console.log(ticTacToe);
    ticTacToe.render(board);
}
