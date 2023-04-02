

class Calculator {

    public appElement: HTMLElement;
    public screenElement: HTMLElement;
    public buttonsElement: HTMLElement;
    public symbolsElement: HTMLElement;
    private evaluation: string;


    constructor(appElement: HTMLElement, screenElement: HTMLElement, buttonsElement: HTMLElement, symbolsElement: HTMLElement, evaluation: string) {
        this.appElement = appElement;
        this.screenElement = screenElement;
        this.buttonsElement = buttonsElement;
        this.symbolsElement = symbolsElement;
        this.evaluation = evaluation;

        this.buttonsElement.addEventListener("click", (e: any): void => {
            this.handleClick(e);
        });

        this.symbolsElement.addEventListener("click", (e: any): void => {
            this.handleClick(e);
        });

        this.buttonsElement.append(...this.createButtons());

        this.symbolsElement.append(...this.createSymbols());
    }

    handleClick(e: any): void {

        const button = e.target.id;

        if (button !== "=" &&
            (button.charCodeAt(0) >= 48 && button.charCodeAt(0) <= 57)) {

            if (this.evaluation === "0")
                this.evaluation = button;
            else
                this.evaluation += button;

        } else if (button === "=") {

            this.evaluation = this.solve();

        } else if (button === "clear") {

            this.evaluation = "0";

        } else {

            this.evaluation += ` ${button} `;
        }

        this.render();
    }

    createButtons(): Array<HTMLElement> {

        const buttons: Array<HTMLElement> = [];

        for (let i = 0; i < 9; i++) {

            const element = document.createElement("button");

            element.innerHTML = i.toString();
            element.setAttribute("id", i.toString());

            buttons.push(element);
        }

        return buttons;
    }

    createSymbols(): Array<HTMLElement> {
        const symbols: Array<HTMLElement> = [];
        const symbolsArray = ["%", "*", "+", "-", "/", "=", "clear"];

        for (let i = 0; i < symbolsArray.length; i++) {

            const element = document.createElement("button");
            const symbol = symbolsArray[i];

            element.innerHTML = symbol;
            element.setAttribute("id", symbol);

            symbols.push(element);
        }

        return symbols;
    }

    solve(): string {

        let result = "";

        result = eval(this.evaluation);

        return result;
    }

    render(): void {

        this.screenElement.innerHTML = "";

        const p = document.createElement("p");

        p.innerHTML = this.evaluation;

        p.setAttribute("class", "number");

        this.screenElement.appendChild(p);

        console.log(this);
    }
}


function main(appElement: HTMLElement, screenElement: HTMLElement, buttonsElement: HTMLElement, symbolsElement: HTMLElement): void {

    const evaluation = "0";

    const calculator = new Calculator(appElement, screenElement, buttonsElement, symbolsElement, evaluation);

    calculator.render();
} 