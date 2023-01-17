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


