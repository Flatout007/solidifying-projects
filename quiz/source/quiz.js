var Quiz = /** @class */ (function () {
    function Quiz(appElement, modalContainerElement, modalElement, submitButton, retakeButton, quizContainerElement, nextButton, answerArray, score, questions) {
        var _this = this;
        this.appElement = appElement;
        this.quizContainerElement = quizContainerElement;
        this.answerArray = answerArray;
        this.score = score;
        this.retakeButton = retakeButton;
        this.questions = questions;
        this.submitButton = submitButton;
        this.modalElement = modalElement;
        this.modalContainerElement = modalContainerElement;
        this.nextButton = nextButton;
        this.questionIndex = 0;
        // on initial page load
        var question = this.questions[0];
        var questionElement = this.createQuestionElement(question, this.questionIndex);
        this.quizContainerElement.appendChild(questionElement);
        this.appElement.removeChild(this.modalContainerElement);
        this.appElement.removeChild(this.submitButton);
        // events
        this.handleChoices();
        this.retakeButton.addEventListener("click", function () {
            _this.retake();
        });
        this.submitButton.addEventListener("click", function () {
            _this.handleScore();
        });
        this.nextButton.addEventListener("click", function () {
            _this.handleNextQuestion(++_this.questionIndex);
        });
    }
    Quiz.prototype.handleChoices = function () {
        var _this = this;
        // add click events to the list items inside the `.choices` class
        document.querySelectorAll(".choices").forEach(function (ele) {
            ele.addEventListener("click", function (e) {
                _this.handleClick(e);
            });
        });
    };
    Quiz.prototype.handleNextQuestion = function (index) {
        if (index >= this.questions.length - 1) {
            this.appElement.replaceChild(this.submitButton, this.nextButton);
        }
        this.quizContainerElement.innerHTML = "";
        this.quizContainerElement.appendChild(this.createQuestionElement(this.questions[index], index));
        // set click events for choices after question has been added to dom
        this.handleChoices();
    };
    Quiz.prototype.retake = function () {
        this.answerArray = [];
        this.score = 0;
        this.questionIndex = 0;
        this.modalContainerElement.style.zIndex = "-100";
        this.appElement.removeChild(this.modalContainerElement);
        this.appElement.replaceChild(this.nextButton, this.submitButton);
        this.handleNextQuestion(this.questionIndex);
        this.render("");
    };
    Quiz.prototype.handleClick = function (e) {
        var id = e.currentTarget.id;
        var letter = e.target.id;
        this.answerArray[id] = letter;
        this.render(letter);
    };
    Quiz.prototype.handleScore = function () {
        var _a;
        var score = "";
        var count = 0;
        for (var i = 0; i < this.answerArray.length; i++) {
            var _b = this.questions[i], answer = _b.answer, choices = _b.choices;
            var key = this.answerArray[i];
            if (choices[key] === answer) {
                count++;
            }
        }
        var span = (_a = this.modalElement) === null || _a === void 0 ? void 0 : _a.querySelector("span");
        this.score = count;
        console.log(this.score);
        score += "".concat(count, "/").concat(this.questions.length);
        if (span) {
            span.innerHTML = score;
        }
        this.appElement.insertBefore(this.modalContainerElement, this.appElement.firstChild);
        this.modalContainerElement.style.zIndex = "100";
        window.scrollTo(0, 0);
    };
    Quiz.prototype.createQuestionElement = function (questionObject, index) {
        var div = document.createElement("div");
        var h3 = document.createElement("h3");
        var ol = document.createElement("ol");
        var question = questionObject.question, choices = questionObject.choices;
        var choicesArray = [];
        var listElements = [];
        var letters = [];
        // get values from the choices hashmap
        for (var key in choices) {
            choicesArray.push(choices[key]);
            letters.push(key);
        }
        div.setAttribute("class", "question");
        ol.setAttribute("id", index.toString());
        h3.setAttribute("class", "question-text");
        ol.setAttribute("class", "choices");
        h3.innerHTML = question;
        // assign choices to current question
        for (var i = 0; i < choicesArray.length; i++) {
            var choice = choicesArray[i];
            var li = document.createElement("li");
            var p = document.createElement("p");
            var span = document.createElement("span");
            span.setAttribute("class", "circle");
            span.setAttribute("id", letters[i]);
            p.innerHTML = choice;
            li.appendChild(p);
            li.appendChild(span);
            listElements.push(li);
        }
        div.appendChild(h3);
        ol.append.apply(ol, listElements);
        div.appendChild(ol);
        return div;
    };
    Quiz.prototype.render = function (letter) {
        var choices = document.querySelector(".choices");
        if (!letter && choices) {
            // if no letter is in answer key array, set all circles to transparent
            var children = choices.querySelectorAll("span");
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                child.style.backgroundColor = "#00000000";
            }
        }
        else if (letter && choices) {
            var children = choices.children;
            for (var i = 0; i < children.length; i++) {
                var child = children[i].querySelector("span");
                if (child.id === letter) {
                    child.style.backgroundColor = "blue";
                }
                else
                    child.style.backgroundColor = "#00000000";
            }
        }
        console.log(this);
    };
    return Quiz;
}());
function main(appElement, modalContainerElement, modalElement, submitButton, retakeButton, quizContainerElement, nextButton) {
    var questions = [
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
    var answerArray = [];
    var score = 0;
    var quiz = new Quiz(appElement, modalContainerElement, modalElement, submitButton, retakeButton, quizContainerElement, nextButton, answerArray, score, questions);
    quiz.render("");
}
