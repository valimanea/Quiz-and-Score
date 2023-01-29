var startScrenSect = document.querySelector("#start-screen");
var questionsSect = document.querySelector("#questions");
var endScreenSect = document.querySelector("#end-screen");
var startButton = document.querySelector("#start");
var questionTitle = document.querySelector("#question-title");
var choices = document.querySelector("#choices");
var submitButton = document.querySelector("#submit");
var feedbackSect = document.querySelector("#feedback");
var timerEl = document.querySelector("#time");

function hideSS() {
  startScrenSect.setAttribute("class", "hide");
}
function showSS() {
  startScrenSect.setAttribute("class", "start");
}

function hideQS() {
  questionsSect.setAttribute("class", "hide");
}

function showQS() {
  questionsSect.setAttribute("class", "start");
}

function hidefdbS() {
  feedbackSect.setAttribute("class", "hide");
}

function showfdbS() {
  feedbackSect.setAttribute("class", "start");
}

var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

var userScores = [];
var finalScore = 0;

var timeLeft = 30;
var stop = 0;
var wrong = 0;
var stopAll = 0;
var answered = 0;

var i = 0;
var isCorrect = 0;
var index = 0;

function countdown() {
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // Set the `textContent` of `timerEl` to show the remaining seconds
    if (timeLeft > 0 && stop == 0) {
      checkTimer();
      timerEl.textContent = timeLeft;

      if (wrong == 1) {
        timeLeft = timeLeft - 5;
        wrong = 0;
      } else {
        // Decrement `timeLeft` by 1
        timeLeft--;
      }
    } else {
      timeLeft = 0;
      timerEl.textContent = timeLeft;
      stopAll = 1;
      checkTimer();
      clearInterval(timeInterval);
    }
  }, 1000);
}

function checkTimer() {
  if (stopAll == 1 && answered == 0) {
    getUserData();
    hidefdbS();
    stopTimer();
  }
}

function stopTimer() {
  stop = 1;
}

function displayMessage() {
  var timeFeedbackDisplay = 0;

  // Uses the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var msgInterval = setInterval(function () {
    if (timeFeedbackDisplay == 1) {
      hidefdbS();
      clearChoices();
      clearFeedback();
      if (i < questions.length - 1) {
        i++;
        loopQuestions();
      } else {
        i = 0;
        answered = 1;
        getUserData();
        hidefdbS();
        stopTimer();
      }
      // Use `clearInterval()` to stop the timer
      clearInterval(msgInterval);
    } else {
      // Display feebdack message
      if (isCorrect == index) {
        feedbackSect.textContent = "Correct!";
        sfxRight.play();
        wrong = 0;
      } else {
        feedbackSect.textContent =
          "Wrong! Correct answer is no. " + [isCorrect + 1];
        sfxWrong.play();
        wrong = 1;
      }
      timeFeedbackDisplay++;
    }
  }, 1000);
}

function loopQuestions() {
  questionTitle.textContent = questions[i].title;
  for (var j = 0; j < questions[i].choices.length; j++) {
    var ul = document.createElement("ul");
    var buttonChoice = document.createElement("button");
    buttonChoice.textContent = [j + 1] + ". " + questions[i].choices[j];

    if (questions[i].choices[j] == questions[i].answer) {
      isCorrect = j;
    }

    ul.setAttribute("data-index", j);

    ul.appendChild(buttonChoice);
    choices.appendChild(ul);
  }
}

function getUserData() {
  clearChoices();
  questionTitle.textContent = "All Done!";
  var AskName = document.createElement("h5");
  var displayScore = document.createElement("h4");
  var x = document.createElement("INPUT");
  var submitB = document.createElement("button");
  if (timeLeft >= 0) {
    finalScore = timeLeft;
    displayScore.textContent = "Your final score is: " + finalScore;
  } else {
    finalScore = 0;
    displayScore.textContent = "Your final score is: " + finalScore;
  }
  AskName.textContent = "Please enter your initials: ";
  submitB.innerHTML = "Submit";
  AskName.appendChild(x);
  AskName.appendChild(submitB);
  questionsSect.appendChild(displayScore);
  questionsSect.appendChild(AskName);

  questionsSect.addEventListener("click", function (event) {
    var element = event.target;

    // If that element is a button...
    if (element.matches("button") === true) {
      var scoreText = x.value.trim();
      console.log(scoreText);

      // Return from function early if submitted scoreText is blank
      if (scoreText === "") {
        return;
      }
      readUserScore();
      var completeScore = scoreText + " : " + finalScore;
      // Add new scoreText to scores array, clear the input
      userScores.push(completeScore);
      storeUserScore(userScores);
      x.value = "";
      gotoUrl();
    }
  });
}

function gotoUrl() {
  window.location.assign("highscores.html");
}

function storeUserScore(text) {
  // Stringify and set "scores" key in localStorage to scores array
  localStorage.setItem("userScores", JSON.stringify(text));
}

function readUserScore() {
  var storedScores = JSON.parse(localStorage.getItem("userScores"));
  if (storedScores !== null) {
    userScores = storedScores;
  }
  // userScores = JSON.parse(localStorage.getItem("userScores"));
}

function clearChoices() {
  while (choices.hasChildNodes()) {
    choices.removeChild(choices.firstChild);
  }
}

function clearFeedback() {
  while (feedbackSect.hasChildNodes()) {
    feedbackSect.removeChild(feedbackSect.firstChild);
  }
}

choices.addEventListener("click", function (event) {
  var element = event.target;

  // If that element is a button...
  if (element.matches("button") === true) {
    // Get its data-index value and compare with correct anwer
    index = element.parentElement.getAttribute("data-index");
    showfdbS();
    displayMessage();
  }
});

// Attach event listener to start button
startButton.addEventListener("click", function () {
  hideSS();
  countdown();
  showQS();
  loopQuestions();
});
