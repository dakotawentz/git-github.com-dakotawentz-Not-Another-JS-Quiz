document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-button");
    const timerElement = document.getElementById("timer");
    const questionElement = document.getElementById("question");
    const heroContainer = document.getElementById("hero-container");
    const questionContainer = document.getElementById("question-container");
    const answerButtonsElement = document.getElementById("answer-buttons");
    const viewHighScoreButton = document.getElementById("view-high-score-button");

    let shuffledQuestions, currentQuestionIndex;


    questionContainer.style.display = "none";

    // Event listener for the Start Quiz button
    startButton.addEventListener("click", startQuiz);
    // viewHighScoreButton.addEventListener("click", viewHighScore);

    // function viewHighScore() {

    // }

    function startQuiz() {
        console.log("started");
        // startButton.classList.add("hide")
        // questionElement.classList.remove("hide")
        questionContainer.style.display = "block";
        shuffledQuestions = questions.sort(() => Math.random() - 0.5)
        console.log(Math.random() - 0.5);
        currentQuestionIndex = 0
        setNextQuestion();
        // Hide hero container and show question container
        heroContainer.style.display = "none";
        

        // Set up timer
        // let timeLeft = 60;

        // const timerInterval = setInterval(function () {
        //     timerElement.textContent = "Time Left: " + timeLeft + " seconds";
        //     if (timeLeft <= 0) {
        //         clearInterval(timerInterval);
        //         // Call a function to end the quiz or do something else
        //         endQuiz();
        //     } else {
        //         timeLeft--;
        //     }
        // }, 1000);
    }


    function setNextQuestion() {
        console.log("question");
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        answerButtonsElement.innerHTML = "";
        questionElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerText = answer.text;
            button.classList.add("btn", "btn-primary");
            if (answer.correct) {
                button.dataset.correct = answer.correct
            }
            button.addEventListener("click", selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    function resetState() {
        clearStatusClass(document.body)
        nextButton.classList.add("hide")
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild
            (answerButtonsElement.firstChild)
        }
    }


    function selectAnswer(e) {
        const selectedButton = e.target
        const correct = selectedButton.dataset.correct
        setStatusClass(document.body, correct)
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct)
        });
        currentQuestionIndex ++;
        setNextQuestion();
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
            question: "What is an example of a JavaScript data type?",
            answers: [
                { text: "String", correct: true },
                { text: "Connector", correct: false },
                { text: "Complex", correct: false },
                { text: "Forward", correct: false }
            ]
        },
        {
            question: "random question 3?",
            answers: [
                { text: "answer1", correct: true },
                { text: "answer2", correct: false },
                { text: "answer3", correct: false },
                { text: "answer4", correct: false }
            ]
        },
        {
            question: "random question 4?",
            answers: [
                { text: "answer1", correct: true },
                { text: "answer2", correct: false },
                { text: "answer3", correct: false },
                { text: "answer4", correct: false }
            ]
        },
        {
            question: "random question 5?",
            answers: [
                { text: "answer1", correct: true },
                { text: "answer2", correct: false },
                { text: "answer3", correct: false },
                { text: "answer4", correct: false }
            ]
        },
        {
            question: "Where?",
            answers: [
                { text: "answer1", correct: true },
                { text: "answer2", correct: false },
                { text: "answer3", correct: false },
                { text: "answer4", correct: false }
            ]
        }
    ];

    function endQuiz() {
        // Add code to handle the end of the quiz
        alert("Quiz ended!");
    }
});
