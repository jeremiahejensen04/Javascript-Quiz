//Jquery variables
var gameStart = document.getElementById("start");
var timerEl = document.getElementById("time");
var viewScores = document.getElementById("view-highscore");
var questionHolder = document.querySelector("#question-container");
var onScreenQuestion = 0;
var currentScore = 0;
var countDown = 60;
var timeLeft;
var userInitials; 

//questions for quiz
var questions = [{
    quest: "What kind of language is Javascript?",
    answerChoices:["Object-Based", "Object-Oriented", "Procedural", "None Of The Above"],
    correct: "Object-Oriented"
},
{
    quest: "Which one of the following is not a type of data:",
    answerChoices:["Strings", "Numbers", "Boolean", "Alerts"],
    correct: "Alerts"
},
{
    quest: "How do you link to a script.js file?",
    answerChoices:["<a>scr='script.js<a>'", "<link src = 'script.js'>", "<script src='code.js'>", "<script scr='code.js'>"],
    correct: "<script src='code.js'>",
},
{
    quest: "How do you access an HTML element in Javascript?",
    answerChoices:["getElementbyId()", "getElementsbyClassName()", "Just A", "Both A & B"],
    correct: "Both A & B"
},
{
    quest: "How do you enclose a string in Javascript?",
    answerChoices:["Curly Brackets", "Parentheses", "Square Brackets", "Quotation Marks"],
    correct: "Quotation Marks",
},
{
    quest: "How do you signify a null operator value?",
    answerChoices:["Boolean", "Undefined", "Object", "Integer"],
    correct: "Object"
},
{
    quest: "What are JS Arrays used to store?",
    answerChoices:["Arrays", "Numbers/Strings", "Booleans", "All Of The Above"],
    correct: "All Of The Above",
},
{
    quest: "How can you stop a timer in JS?",
    answerChoices:["clearInterval", "clearTimer", "intervalOver", "reset"],
    correct: "clearInterval"
},
{
    quest: "How do you signify a function in JS?",
    answerChoices:["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
    correct: "Parentheses",
},
{ 
    quest: "How can you add comments in JS?",
    answerChoices:["/* */", "//", "#", "$$"],
    correct: "//"
},
{
    quest: "How can you convert an object to a string?",
    answerChoices:["Stringify()", "Parse()", "Convert()", "function()"],
    correct: "Stringify()"
},
{
    quest: "How can you test your code in the console?",
    answerChoices:["Terminal", "Git-Bash", "Print", "Console.log"],
    correct: "Console.log",
}];

//timer function
function timer() {
    timerEl.textContent = "Time remaining: " + countDown + "s";
    timeLeft = setInterval(function () {
        if (countDown > 0) {
            adjustTime(-1);
        } else {
            endQuiz();
        }
    }, 1000);
}

function adjustTime(amount) {
    countDown += amount;
    if (countDown < 0) {
        countDown = 0;
    }

//text for timer
    timerEl.textContent = "Time remaining: " + countDown + "s";
}

gameStart.onclick = timer;

//displays questions and relative buttons
var createQuestion = function (question) {
    questionHolder.innerHTML = "";

    var questionHeader = document.createElement("h2");
    questionHeader.textContent = question.quest;

    var answerA = document.createElement("button");
    answerA.textContent = question.answerChoices[0];
    answerA.addEventListener("click", answerClick);

    var answerB = document.createElement("button");
    answerB.textContent = question.answerChoices[1];
    answerB.addEventListener("click", answerClick);

    var answerC = document.createElement("button");
    answerC.textContent = question.answerChoices[2];
    answerC.addEventListener("click", answerClick);

    var answerD = document.createElement("button");
    answerD.textContent = question.answerChoices[3];
    answerD.addEventListener("click", answerClick);

    questionHolder.appendChild(questionHeader);
    questionHolder.appendChild(answerA);
    questionHolder.appendChild(answerB);
    questionHolder.appendChild(answerC);
    questionHolder.appendChild(answerD);
}
//matches with correct
var correctAnswer = questions[onScreenQuestion].correct;

//compares with correct answer
var answerClick = function(event) {
    event.preventDefault();
    var UserChoice = event.target.textContent;
    correctAnswer = questions[onScreenQuestion].correct;
    //subtracts time if incorrect
    var checkAnswer = document.querySelector("#answer-determination");
    if (UserChoice !== correctAnswer) {
        adjustTime(-15);
        checkAnswer.textContent = "Wrong!";
        onScreenQuestion++;
        if (onScreenQuestion >= questions.length) {
            endQuiz();
        } else {createQuestion(questions[onScreenQuestion])};

    }
    else if (UserChoice === correctAnswer) {
        onScreenQuestion++;
        checkAnswer.textContent = "Correct!";
        currentScore++;
        if (onScreenQuestion >= questions.length) {
            endQuiz();
        } else {createQuestion(questions[onScreenQuestion])};
    }
};
//starts quiz
var quiz = function (event) {
    event.preventDefault();
    resetDisplay();
    createQuestion(questions[onScreenQuestion]);
};
//refresh
function resetDisplay() {
    questionHolder.innerHTML="";
    document.querySelector("#reset-page").style.display = "none";
}
//local storage highschores
function highScores() {
    let data = localStorage.getItem("object");
    let getData = JSON.parse(data);
    let name = getData.name;
    let score = getData.score;
    questionHolder.innerHTML = "";
    questionHolder.innerHTML = name + " " + score;
}
viewScores.addEventListener("click", () => {
    highScores();
})

//final screen
function endQuiz() {
    resetDisplay();
    timerEl.textContent = "";
    clearInterval(timeLeft);
    var endScreen = document.createElement("h2");
    questionHolder.appendChild(endScreen);

    let leaderBoard = document.querySelector("#answer-determination");
    leaderBoard.innerHTML = "";

    endScreen.innerHTML = "Your final score is " + currentScore + " out of 12. Enter your initials to save your Highscore";

    var initialBox = document.createElement("input");
    leaderBoard.appendChild(initialBox);

    var scoreSubmitBtn = document.createElement("button");
    scoreSubmitBtn.textContent = "Submit";
    leaderBoard.appendChild(scoreSubmitBtn);

    scoreSubmitBtn.addEventListener("click", () => {
    
        if (initialBox.value.length === 0) return false;

        let storeuserInitials = (...input) => {
            let data = JSON.stringify({ "name":input[0]+ " -", "score":input[1]})
            localStorage.setItem("object", data)
        }
        storeuserInitials(initialBox.value, currentScore);
    });
    
    var playAgainBtn = document.createElement("button");
        playAgainBtn.textContent= "Play Again?";
        leaderBoard.appendChild(playAgainBtn);
        playAgainBtn.addEventListener("click", () => {
            location.reload();
        })

    document.querySelector("input").value = "";

    initialBox.addEventListener("submit", endQuiz);
    
};
function renderuserInitials() {
    scoreSubmitBtn.addEventListener('click', function(event) {
        event.preventDefault;
}
)};
gameStart.addEventListener('click', quiz);