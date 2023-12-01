document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-button");
    const timerElement = document.getElementById("timer");
    const questionElement = document.getElementById("question");
    const heroContainer = document.getElementById("hero-container");
    const questionContainer = document.getElementById("question-container");
    const answerButtonsElement = document.getElementById("answer-buttons");
    const username = document.getElementById("username");
    const initials = document.getElementById("initials");
    const viewHighScores = JSON.parse(localStorage.getItem('high-scores'))
    const scoreText = document.getElementById("score");
    const submitScoreButton = document.getElementById("submitScore");
    const finalScore = document.getElementById("finalScore");
    const mostRecentScore = document.getElementById("mostRecentScore");
    const viewHighScoreButton = document.getElementById("view-high-score-button");



    let shuffledQuestions, currentQuestionIndex = 0;

    let score = 0;
    let correct;
    let wrong;
    let timerInterval;
    let timeLeft = 60;
    
    
    // Event listeners
    startButton.addEventListener("click", startQuiz);
    
const questions = [
    {
        question: "Where should you go to initiate nodejs?",
        answers: [
            { text: "Terminal", correct: true },
            { text: "Explorer", correct: false },
            { text: "Browser", correct: false },
            { text: "Nav Bar", correct: false }
        ]
    },
    {
        question: "Which of the following is not a primitive data type?",
        answers: [
            { text: "Object", correct: true },
            { text: "String", correct: false },
            { text: "Boolean", correct: false },
            { text: "Number", correct: false }
        ]
    },
    {
        question: "Which of the following is not a comparison operator in JavaScript?",
        answers: [
            { text: "=<", correct: true },
            { text: "===", correct: false },
            { text: "==", correct: false },
            { text: "!=", correct: false }
        ]
    },
    {
        question: "What does the “NaN” value represent in JavaScript?",
        answers: [
            { text: "Not a Number", correct: true },
            { text: "Boolean Value", correct: false },
            { text: "Undefined Value", correct: false },
            { text: "Null Value", correct: false }
        ]
    },
    {
        question: "What does the “this” keyword refer to in JavaScript?",
        answers: [
            { text: "The object that the function belongs to", correct: true },
            { text: "The pareent object of the current object", correct: false },
            { text: "The global object", correct: false },
            { text: "The current function", correct: false }
        ]
    },
    {
        question: "What does the “forEach” method do in JavaScript?",
        answers: [
            { text: "Executes a function once for each element in an array", correct: true },
            { text: "Reverses the order of the elements in an array", correct: false },
            { text: "Removes an element from the beginning of an array", correct: false },
            { text: "Adds a new element to the end of an array", correct: false }
        ]
    }
];

    function endQuiz() {
        questionElement.textContent = "";
    alert("Quiz ended!");
} 

viewHighScoreButton.addEventListener("click", viewHighScores);
    
function setNextQuestion() {
    if (currentQuestionIndex < finalQuestionIndex) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
        endQuiz();
    }
}

function startQuiz() {
    console.log("started");
    questionContainer.style.display = "block";
    shuffledQuestions = questions.sort(() => Math.random() - 0.5)
    console.log(Math.random() - 0.5);
    currentQuestionIndex = 0
    setNextQuestion();
    heroContainer.style.display = "none";
    
    timerInterval = setInterval(function () {
        timerElement.textContent = "Time Left: " + timeLeft + " seconds";
        if (timeLeft <= 0 || currentQuestionIndex >= questions.length) {
            clearInterval(timerInterval);
            endQuiz();
        } else {
            timeLeft--;
        }
    }, 1000);
}

let finalQuestionIndex = questions.length;

function showQuestion(question) {
    answerButtonsElement.innerHTML = "";
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn", "btn-primary");
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        console.log(isCorrect);
        score++;
    } else {
        timeLeft -= 10;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
    }
    updateScore();
    setStatusClass(document.body, isCorrect);
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct === "true");
    });
    currentQuestionIndex++;
    setNextQuestion();
    
}

function updateScore() {
    scoreText.textContent = "Score: " + score;
}

function setStatusClass(element, correct) {
    clearStatusClass(element) 
    if(correct) { 
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}


function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

function submitScore() {
    // takes scores from game
    const userInput = initials.value;
    const userScores = `${initials} got ${score} points!`;
    localStorage.setItem("ScoreInputs", userScores);

    // stores initials and scores to local storage that user can view
    if(initials.value === "") {
        alert("Initials cannot be blank");
        return false;
    } else {
        const savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        const currentUser = initials.value.trim();
        const currentHighscore = {
            name : currentUser,
            score : score
        };
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    }
}
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

submitScoreButton.addEventListener("click", submitScore);

function submitScore() {
    const userInput = initials.value.trim();

         if(initials.value === "") {
        alert("Initials cannot be blank");
        return false;
    } else {
        const savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        const currentHighscore = {
            name : userInput,
            score : score
        };
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        // generateHighscores();
    }
}

// function generateHighscores () {
//     saveHighScore = e => {
//         e.preventDefault();
    
//         const score = {
//             score: mostRecentScore,
//             name: initials.value
//         }
    
//         highScores.push(score);
    
//         highScores.sort((a,b) => {
//             return b.score - a.score
//         })
    
//         localStorage.setItem("highScores", JSON.stringify(highScores))
//         window.location.assign("/");

//     }
// }

});    