var Calculator = /** @class */ (function () {
    function Calculator(appElement, screenElement, buttonsElement, symbolsElement, evaluation) {
        var _a, _b;
        var _this = this;
        this.appElement = appElement;
        this.screenElement = screenElement;
        this.buttonsElement = buttonsElement;
        this.symbolsElement = symbolsElement;
        this.evaluation = evaluation;
        this.buttonsElement.addEventListener("click", function (e) {
            _this.handleClick(e);
        });
        this.symbolsElement.addEventListener("click", function (e) {
            _this.handleClick(e);
        });
        (_a = this.buttonsElement).append.apply(_a, this.createButtons());
        (_b = this.symbolsElement).append.apply(_b, this.createSymbols());
    }
    Calculator.prototype.handleClick = function (e) {
        var button = e.target.id;
        if (button !== "=" &&
            (button.charCodeAt(0) >= 48 && button.charCodeAt(0) <= 57)) {
            if (this.evaluation === "0")
                this.evaluation = button;
            else
                this.evaluation += button;
        }
        else if (button === "=") {
            this.evaluation = this.solve();
        }
        else if (button === "clear") {
            this.evaluation = "0";
        }
        else {
            this.evaluation += " ".concat(button, " ");
        }
        this.render();
    };
    Calculator.prototype.createButtons = function () {
        var buttons = [];
        for (var i = 0; i < 9; i++) {
            var element = document.createElement("button");
            element.innerHTML = i.toString();
            element.setAttribute("id", i.toString());
            buttons.push(element);
        }
        return buttons;
    };
    Calculator.prototype.createSymbols = function () {
        var symbols = [];
        var symbolsArray = ["%", "*", "+", "-", "/", "=", "clear"];
        for (var i = 0; i < symbolsArray.length; i++) {
            var element = document.createElement("button");
            var symbol = symbolsArray[i];
            element.innerHTML = symbol;
            element.setAttribute("id", symbol);
            symbols.push(element);
        }
        return symbols;
    };
    Calculator.prototype.solve = function () {
        var result = "";
        result = eval(this.evaluation);
        return result;
    };
    Calculator.prototype.render = function () {
        this.screenElement.innerHTML = "";
        var p = document.createElement("p");
        p.innerHTML = this.evaluation;
        p.setAttribute("class", "number");
        this.screenElement.appendChild(p);
        console.log(this);
    };
    return Calculator;
}());
function main(appElement, screenElement, buttonsElement, symbolsElement) {
    var evaluation = "0";
    var calculator = new Calculator(appElement, screenElement, buttonsElement, symbolsElement, evaluation);
    calculator.render();
}
