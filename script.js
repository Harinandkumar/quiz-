const questions = [
  {
    question: "हमारे सौर सिस्टम में सबसे बड़ा ग्रह कौन सा है?",
    answers: [
      { text: "पृथ्वी", correct: false },
      { text: "शनि", correct: false },
      { text: "बृहस्पति", correct: true },
      { text: "अरुण", correct: false },
    ]
  },
  {
    question: "भौतिकीज्ञ ने गुरुत्वाकर्षण की खोज की थी?",
    answers: [
      { text: "गैलिलियो गैलिलेई", correct: false },
      { text: "आइज़क न्यूटन", correct: true },
      { text: "अल्बर्ट आइंस्टीन", correct: false },
      { text: "लियोनार्डो डा विंसी", correct: false },
    ]
  },
  {
    question: "पौधों द्वारा उनके अपने भोजन का उत्पादन करने की प्रक्रिया क्या है?",
    answers: [
      { text: "श्वसन", correct: false },
      { text: "फोटोसिंथेसिस", correct: true },
      { text: "अपघात", correct: false },
      { text: "संश्लेषण", correct: false },
    ]
  },
  {
    question: "आवर्त सारणी में सबसे हल्का तत्व कौन सा है?",
    answers: [
      { text: "हाइड्रोजन", correct: true },
      { text: "हेलियम", correct: false },
      { text: "ऑक्सीजन", correct: false },
      { text: "नाइट्रोजन", correct: false },
    ]
  },
  {
    question: "पृथ्वी पर सबसे बड़ी जीवित चीज क्या है?",
    answers: [
      { text: "नीली व्हेल", correct: false },
      { text: "ग्रेट बैरियर रीफ", correct: true },
      { text: "अमेज़न वर्षावन", correct: false },
      { text: "ग्रैंड कैनयन", correct: false },
    ]
  },
  {
    question: "विकास के सिद्धांत का विकास किस वैज्ञानिक द्वारा किया गया था?",
    answers: [
      { text: "चार्ल्स डार्विन", correct: true },
      { text: "ग्रेगर मेंडल", correct: false },
      { text: "अल्बर्ट आइंस्टीन", correct: false },
      { text: "लुई पास्टर", correct: false },
    ]
  },
  {
    question: "जिस प्रक्रिया के द्वारा पानी पौधे के माध्यम से चलता है, उसे क्या कहते हैं?",
    answers: [
      { text: "श्वसन", correct: false },
      { text: "फोटोसिंथेसिस", correct: false },
      { text: "वाष्पीकरण", correct: true },
      { text: "उपवास", correct: false },
    ]
  },
  {
    question: "हमारे सौर सिस्टम में कौन सा ग्रह सबसे गर्म होने के लिए जाना जाता है?",
    answers: [
      { text: "बुध", correct: false },
      { text: "शुक्र", correct: true },
      { text: "मंगल", correct: false },
      { text: "बृहस्पति", correct: false },
    ]
  },
  {
    question: "पृथ्वी की धरती की संरचना का अध्ययन के लिए वैज्ञानिक शब्द क्या है?",
    answers: [
      { text: "भूविज्ञान", correct: true },
      { text: "मौसमविज्ञान", correct: false },
      { text: "समुद्र विज्ञान", correct: false },
      { text: "खगोलशास्त्र", correct: false },
    ]
  },
  {
    question: "X-रे की खोज किस वैज्ञानिक द्वारा की गई थी?",
    answers: [
      { text: "विल्हेल्म कोन्राड रेंट्गन", correct: true },
      { text: "मरी क्यूरी", correct: false },
      { text: "अल्बर्ट आइंस्टीन", correct: false },
      { text: "लुई पास्टर", correct: false },
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "आगे";
  nextButton.removeEventListener("click", startQuiz);  // Ensure this listener is removed when starting the quiz
  nextButton.addEventListener("click", handleNextButton);  // Add click listener for handling next question
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = `प्रश्न ${currentQuestionIndex + 1} का ${questions.length} में से: ${currentQuestion.question}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  if (correct) {
    score++;
  }
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
    button.classList.add('disabled');
  });
  selectedButton.classList.add('selected');
  nextButton.style.display = "block";
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
  element.classList.remove("selected");
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  questionElement.innerText = `आपने ${questions.length} में से ${score} अंक प्राप्त किए हैं!`;
  nextButton.innerText = "पुनः आरंभ करें";
  nextButton.style.display = "block";
  nextButton.removeEventListener("click", handleNextButton);  // Ensure this listener is removed when showing the score
  nextButton.addEventListener("click", startQuiz);  // Add click listener for restarting the quiz
}

startQuiz();
