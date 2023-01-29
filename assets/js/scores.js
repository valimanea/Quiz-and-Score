var scoresList = document.querySelector("#highscores");
var clearB = document.querySelector("#clear");

var scores = [];

init();

console.log("started");

function renderScores() {
  scoresList.innerHTML = "";

  // Render a new li for each score
  for (var i = 0; i < scores.length; i++) {
    var eachScore = scores[i];

    var li = document.createElement("li");
    li.textContent = eachScore;
    li.setAttribute("data-index", i);

    scoresList.appendChild(li);
  }
}

function init() {
  // Get stored scores from localStorage
  // Parsing the JSON string to an object
  var storedScores = JSON.parse(localStorage.getItem("userScores"));

  // If scores were retrieved from localStorage, update the scores array to it
  if (storedScores !== null) {
    scores = storedScores;
  }

  // Render scores to the DOM
  renderScores();
}

function clearScores() {
    window.localStorage.clear();
}


clearB.addEventListener("click", function(event) {
  var element = event.target;

  // If that element is a button...
  if (element.matches("button") === true) {
    clearScores();
    scores = [];
  }
  renderScores();
});

