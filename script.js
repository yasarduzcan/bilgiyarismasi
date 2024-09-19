const questions = [
    // Example question structure
    {
        image: 'question1.png',
        answers: ['A', 'B', 'C', 'D', 'E'],
        correctAnswer: 'A',
        solutionImage: 'solution1.png'
    },
    // Add more questions as needed
];

let currentQuestionIndex = 0;

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question-image').src = question.image;

    const answerButtons = document.getElementById('answer-buttons');
    answerButtons.innerHTML = '';
    
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.onclick = () => checkAnswer(answer, question.correctAnswer);
        answerButtons.appendChild(button);
    });

    document.getElementById('solution').innerHTML = '';
}

function checkAnswer(selectedAnswer, correctAnswer) {
    const buttons = document.querySelectorAll('#answer-buttons .btn');
    buttons.forEach(button => {
        if (button.innerText === correctAnswer) {
            button.classList.add('correct');
        } else if (button.innerText === selectedAnswer) {
            button.classList.add('incorrect');
            document.getElementById('solution').innerHTML = `<img src="${questions[currentQuestionIndex].solutionImage}" alt="Solution">`;
        }
    });
    disableButtons();
}

function disableButtons() {
    const buttons = document.querySelectorAll('#answer-buttons .btn');
    buttons.forEach(button => button.disabled = true);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        alert('No more questions!');
    }
}

window.onload = loadQuestion;
