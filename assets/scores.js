const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScore = document.querySelector("#mostRecentScore");

const highScores = JOSN.parse(localStorage.getItem("highScores")) || [];

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value 
})

saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score);

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    localStorage.setItem("highScores", JSON.stringify(highScores))
    window.location.assign("/");

}
