interface Choices {

}

class Quiz {

    public appElement: HTMLElement;
    public quizContainerElement: HTMLElement;
    public choicesElement: HTMLElement
    public retakeButton: HTMLElement;
    public scoreElement: HTMLElement;
    public submitButton: HTMLElement;
    public modalContainerElement: HTMLElement;
    public modalElement: HTMLElement;
    private answerArray: Array<string>;
    private score: number;
    private questions: Array<any>;

    constructor(appElement: HTMLElement, modalContainerElement: HTMLElement, modalElement: HTMLElement, submitButton: HTMLElement, retakeButton: HTMLElement, quizContainerElement: HTMLElement, answerArray: Array<string>, score: number, questions: Array<any>) {
        this.appElement = appElement;
        this.quizContainerElement = quizContainerElement;
        this.answerArray = answerArray;
        this.score = score;
        this.retakeButton = retakeButton;
        this.questions = questions;
        this.submitButton = submitButton;
        this.modalElement = modalElement;
        this.modalContainerElement = modalContainerElement;

        // constant renders
        for (let i = 0; i < this.questions.length; i++) {

            const question = this.questions[i];

            const element = this.createQuestionElement(question, i);

            this.quizContainerElement.appendChild(element);
        }

        this.appElement.removeChild(this.modalContainerElement);

        // events
        document.querySelectorAll(".choices").forEach((ele: any): void => {
            ele.addEventListener("click", (e: any): void => {
                this.handleClick(e);
            });
        });

        this.retakeButton.addEventListener("click", (): void => {
            this.retake();
        });

        this.submitButton.addEventListener("click", (): void => {
            this.handleScore();
        });
    }

    retake(): void {
        this.answerArray = [];
        this.score = 0;
        this.modalContainerElement.style.zIndex = "-100";
        this.appElement.removeChild(this.modalContainerElement);
        this.render("", 0);
    }

    handleClick(e: any): void {

        const id = e.currentTarget.id;
        const letter = e.target.id;

        this.answerArray[id] = letter;

        this.render(letter, id);
    }

    handleScore(): void {
        let score = "";
        let count = 0;

        for (let i = 0; i < this.answerArray.length; i++) {

            const { answer, choices } = this.questions[i];
            const key = this.answerArray[i];

            if (choices[key] === answer) {
                count++;
            }
        }

        const span = this.modalElement?.querySelector("span");

        score += `${count}/${this.questions.length}`;

        if (span) {
            span.innerHTML = score;
        }

        this.appElement.insertBefore(this.modalContainerElement, this.appElement.firstChild);
        this.modalContainerElement.style.zIndex = "100";

        window.scrollTo(0, 0);
    }

    createQuestionElement(questionObject: any, index: number): HTMLElement {
        const div = document.createElement("div");
        const h3 = document.createElement("h3");
        const ol = document.createElement("ol");
        const { question, choices } = questionObject;
        const choicesArray: Array<any> = [];
        const listElements: Array<HTMLElement> = [];
        const letters: Array<string> = [];

        for (var key in choices) {
            choicesArray.push(choices[key]);
            letters.push(key);
        }

        div.setAttribute("class", "question");
        ol.setAttribute("id", index.toString());
        h3.setAttribute("class", "question-text");
        ol.setAttribute("class", "choices");

        h3.innerHTML = question;

        for (let i = 0; i < choicesArray.length; i++) {
            const choice = choicesArray[i];
            const li = document.createElement("li");
            const p = document.createElement("p");
            const span = document.createElement("span");

            span.setAttribute("class", "circle");
            span.setAttribute("id", letters[i]);

            p.innerHTML = choice;

            li.appendChild(p);
            li.appendChild(span);

            listElements.push(li);
        }

        div.appendChild(h3);
        ol.append(...listElements);
        div.appendChild(ol);

        return div;
    }


    render(letter: string, index: number): void {

        const choices = document.querySelectorAll(".choices");

        if (!letter || !index) {

            choices.forEach((ele) => {

                const children = ele.querySelectorAll("span");

                for (let i = 0; i < children.length; i++) {
                    const child = children[i];

                    child.style.backgroundColor = "white";
                }
            });

            return;
        }

        const children = choices[index].children;

        for (let i = 0; i < children.length; i++) {

            const child: any = children[i].querySelector("span");

            if (child.id == letter) {
                child.style.backgroundColor = "blue";
            }
            else
                child.style.backgroundColor = "white";
        }

        console.log(this);
    }
}


function main(appElement: HTMLElement, modalContainerElement: HTMLElement, modalElement: HTMLElement, submitButton: HTMLElement, retakeButton: HTMLElement, quizContainerElement: HTMLElement): void {
    const questions = [
        {
            question: "When was the release date of the javascript programming language ?",
            choices: { A: "December 4, 1995", B: "December 10, 1995", C: "December 4, 2020" },
            answer: "December 4, 1995"
        },
        {
            question: "How long did it take to build the first version of the javascript programming language ?",
            choices: { A: "10 days", B: "10 years", C: "1 hour" },
            answer: "10 days"
        },
        {
            question: "Who is the creator of the javascript programming language ?",
            choices: { A: "Brendan Eich", B: "Brendan Fraser", C: "Bill Gates" },
            answer: "Brendan Eich"
        },
        {
            question: "What year did the keywords `let` and `const` become available to the javascript programming language ?",
            choices: { A: "2015", B: "2016", C: "2020" },
            answer: "2015"
        },
        {
            question: "What year did arrow functions become available to the javascript programming language ?",
            choices: { A: "2015", B: "2019", C: "2005" },
            answer: "2015"
        }
    ];
    const answerArray = [];
    const score = 0;
    const quiz = new Quiz(appElement, modalContainerElement, modalElement, submitButton, retakeButton, quizContainerElement, answerArray, score, questions);

    quiz.render("", 0);
}