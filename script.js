const questions = [
  {
    question: "How many days are there in a week?",
    answers: [
      { text: "Five", correct: false },
      { text: "Seven", correct: true },
      { text: "Twelve", correct: false },
      { text: "Four", correct: false },
    ],
  },
  {
    question: "What is the capital of India?",
    answers: [
      { text: "Mumbai", correct: false },
      { text: "Bangalore", correct: false },
      { text: "Patna", correct: false },
      { text: "New Delhi", correct: true },
    ],
  },
  {
    question: "Who is the Prime Minister of India?",
    answers: [
      { text: "Sachin Tendulkar", correct: false },
      { text: "Rahul Gandhi", correct: false },
      { text: "Shri Narendra Modi", correct: true },
      { text: "Amitabh Bachann", correct: false },
    ],
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      { text: "Australia", correct: true },
      { text: "Asia", correct: false },
      { text: "Africa", correct: false },
      { text: "Europe", correct: false },
    ],
  },
  {
    question: "Pick the longest river in India!",
    answers: [
      { text: "Yamuna", correct: false },
      { text: "Krishna", correct: false },
      { text: "Ganga", correct: true },
      { text: "Narmada", correct: false },
    ],
  },
  {
    question: "What is the full of HTML?",
    answers: [
      { text: "HighText Markup Language", correct: false },
      { text: "HyperText Markup Language", correct: true },
      { text: "HyperText Marked Language", correct: false },
      { text: "HighText Marked Language", correct: false },
    ],
  },
  {
    question: "How many bones are there in a human adult body?",
    answers: [
      { text: "206", correct: true },
      { text: "207", correct: false },
      { text: "208", correct: false },
      { text: "201", correct: false },
    ],
  },
  {
    question: "Who is the owner of X (formerly known as Twitter)?",
    answers: [
      { text: "Nelson Mandela", correct: false },
      { text: "Nitish Kumar", correct: false },
      { text: "Mukesh Ambani", correct: false },
      { text: "Elon Musk", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerElements = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let Score = 0;

function StartQuiz() {
  currentQuestionIndex = 0;
  Score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerElements.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerElements.firstChild) {
    answerElements.removeChild(answerElements.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    Score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerElements.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${Score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    StartQuiz();
  }
});

StartQuiz();
