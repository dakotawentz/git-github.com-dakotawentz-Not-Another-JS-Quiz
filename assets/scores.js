const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScore = document.querySelector("#mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("high-scores")) || [];

function displayHighScores() {
    // append list of scores
}

// make go back to start of quiz button here
