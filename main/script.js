const quizData = [
    {
        question: "Are You Human?",
        answers: [
            { text: "No", correct: false },
            { text: "Yes", correct: true },
            { text: "Maybe", correct: false },
            { text: "Apparently", correct: false },
            timeLimit = 10
        ]
    },
    {
        question: "What year did World War II end?",
        answers: [
            { text: "1941", correct: false },
            { text: "1942", correct: false },
            { text: "1943", correct: false },
            { text: "1945", correct: true },
            timeLimit = 10
        ]
    },
    {
        question: "How Long Should A Front-end Course Be?",
        answers: [
            { text: "14 Weeks", correct: false },
            { text: "10 Weeks", correct: true },
            { text: "20 Weeks", correct: false },
            { text: "I Don't Know", correct: false },
            timeLimit = 10
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Saturn", correct: false },
            { text: "Mars", correct: false },
            timeLimit = 10
        ]
    },
    {
        question: "What Was Covid's Death Rate in Nigeria -2020?",
        answers: [
            { text: "10%", correct: false },
            { text: "1.3%", correct: true },
            { text: "2%", correct: false },
            { text: "0.95", correct: false },
            timeLimit = 10
        ]
    }
];


const questionElem = document.getElementById("question-container");
const answerBtnsElem = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElem.innerText = currentQuestion.question;
    answerBtnsElem.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
        answerBtnsElem.appendChild(button);
    });
    const progressTracker = document.getElementById("progress-tracker");
    progressTracker.innerText = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    const progressBar = document.getElementById("progress-bar");
    const progress = document.createElement("div");
    const progressWidth = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progress.style.width = `${progressWidth}%`;
    progress.classList.add("progress");
    progressBar.innerHTML = "";
    progressBar.appendChild(progress);
}

function selectAnswer(event) {
    const selectedBtn = event.target;
    const correct = selectedBtn.dataset.correct;

    if (correct) {
        selectedBtn.classList.add("correct");
        score++;
        nextQuestion();
    }
    else if (!correct) {
        selectedBtn.classList.add("incorrect");
        setTimeout(nextQuestion, 1000);
    }
    else {
        selectedBtn.classList.add("incorrect");
        Array.from(answerBtnsElem.children).forEach(button => {
            button.disabled = true;
        });
        nextBtn.classList.remove("hide");
    }
}


function nextQuestion() {
    clearInterval(timer);
    timeRemaining = 10;
    timer = setInterval(updateTimeRemaining, 1000);
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        setTimeout(loadQuestion, 1000);
    } else {
        endQuiz();
    }
}


function endQuiz() {
    clearInterval(timer);
    const passingScore = 90;
    const scorePercentage = Math.round((score / quizData.length) * 100);
    const scoreMessage = scorePercentage >= passingScore ? "Congratulations, You passed!" : "Ooops, You failed.";
    const backgroundColor = scorePercentage >= passingScore ? "green" : "red";
    const closeBtn = document.getElementById('close')

    questionElem.innerText = `Your score is ${scorePercentage}% ${scoreMessage}`;
    questionElem.style.backgroundColor = backgroundColor;
    questionElem.style.color = "white";
    questionElem.style.textAlign = "center";
    questionElem.style.fontSize = "24px";
    questionElem.style.padding = "20px";
    questionElem.style.width = "600px";
    questionElem.style.height = "80vh";
    questionElem.style.borderRadius = "30px";
    questionElem.style.zIndex = "10";
    answerBtnsElem.innerHTML = "";
    nextBtn.classList.add("hide");
    closeBtn.style.display = "inline";
    closeBtn.style.zIndex = "20";
    closeBtn.addEventListener("click", closer);
}

function closer(){
    window.open("../index.html", "_parent")
};


nextBtn.addEventListener("click", nextQuestion);

loadQuestion();

let timeRemaining = 10;
function updateTimeRemaining() {
    timeRemaining--;
    document.getElementById("time-remaining").innerHTML = timeRemaining;
    if (timeRemaining <= 0) {
        clearInterval(timer);
        nextQuestion();
    }
}
let timer = setInterval(updateTimeRemaining, 1000);
//