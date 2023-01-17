// Prepare all selector that we might need to point to the html element
var startButton = document.querySelector('#start');
var questionsEl = document.querySelector('#questions');
var choicesEl = document.querySelector('#choices');
var timerEl = document.querySelector('#time');
var submitBtn = document.querySelector('#submit');
var initialsEl = document.querySelector('#initials');
var feedbackEl = document.querySelector('#feedback');
var startScreenEl = document.getElementById("start-screen");


var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
    // hide start screen
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");

    // un-hide questions section
    questionsEl.removeAttribute("class");

    // start timer
    timerId = setInterval(clockTick, 1000);

    // show starting time
    timerEl.textContent = time;

    getQuestion();
}

function getQuestion() {
    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex];

    // update title with current question
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;

    // clear out any old question choices
    choicesEl.innerHTML = "";

    // loop over choices
    currentQuestion.choices.forEach(function (choice, i) {
        // create new button for each choice
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);

        choiceNode.textContent = i + 1 + ". " + choice;

        // attach click event listener to each choice
        choiceNode.onclick = questionClick;

        // display on the page
        choicesEl.appendChild(choiceNode);
    });
}

function questionClick() {
    //check if user guessed wrong
    if (this.value !== questions[currentQuestionIndex].answer) {
        // penalize time
        time -= 10;

        if (time < 0) {
            time = 0;
        }
        //display new time on page
        timerEl.textContent = time;
        feedbackEl.textContent = "Wrong";
        feedbackEl.getElementsByClassName.color = "red";
        feedbackEl.getElementsByClassName.fontSize = "400%";

        // flash right/wrong feedback
        feedbackEl.setAttribute("class", "feedback");
        setTimeout(function() {
            feedbackEl.setAttribute("class", "feedback hide");
        }, 1000);

        //next question
        currentQuestionIndex++;

        //time checker
        if (currentQuestionIndex === questions.length) {
            quizEnd();
        } else {
            getQuestion();
        }
    }
}
function quizEnd() {
    //stop timer
    clearInterval(timerId);
    //show end screen
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");
    //show final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
    //hide questions section
    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    //update time
    time--;
    timerEl.textContent = time;

    //check if user ran out of time
    if (time <= 0) {
        quizEnd();
    }
}

function saveHighScore() {
    //get value of input box
    var initials = initialsEl.value.trim();

    if (initials !== "") {
        //get saved scored fro local storage, or if not any, set to empty array
        var highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];

        // format new score object for current user
        var newScore = {
            score: time,
            initials: initials
        };

        //save to local storage
        highScores.push(newScore);
        window.localStorage.setItem("highScores", JSON.stringify(highScores));

        // redirect to next page
        window.location.href = "score.html";
    }
}
function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighScore();
    }
}

//submit initials
submitBtn.onclick = saveHighScore;

//start quiz
startButton.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
