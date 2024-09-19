const questions = [
    {
        question: 'https://drive.google.com/uc?id=YOUR_QUESTION_IMAGE_ID1',
        options: [
            { src: 'https://drive.google.com/uc?id=YOUR_OPTION_IMAGE_ID1', isCorrect: true },
            { src: 'https://drive.google.com/uc?id=YOUR_OPTION_IMAGE_ID2', isCorrect: false },
            { src: 'https://drive.google.com/uc?id=YOUR_OPTION_IMAGE_ID3', isCorrect: false },
            { src: 'https://drive.google.com/uc?id=YOUR_OPTION_IMAGE_ID4', isCorrect: false },
            { src: 'https://drive.google.com/uc?id=YOUR_OPTION_IMAGE_ID5', isCorrect: false }
        ],
        feedback: 'https://drive.google.com/uc?id=YOUR_FEEDBACK_IMAGE_ID1'
    },
    // Add more questions here
];

let currentQuestionIndex = 0;
let shuffledQuestions = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadQuestion() {
    if (shuffledQuestions.length === 0) {
        shuffledQuestions = shuffle(questions.slice());
    }

    const question = shuffledQuestions[currentQuestionIndex];
    document.getElementById('question-image').src = question.question;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.innerHTML = `<img src="${option.src}" alt="Option Image">`;
        optionElement.addEventListener('click', () => handleOptionClick(option.isCorrect, option.src));
        optionsContainer.appendChild(optionElement);
    });

    document.getElementById('feedback-container').style.display = 'none';
    document.getElementById('next-button').style.display = 'none';
}

function handleOptionClick(isCorrect, feedbackImageSrc) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.removeEventListener('click', handleOptionClick));

    const feedbackContainer = document.getElementById('feedback-container');
    const feedbackImage = document.getElementById('feedback-image');
    const feedbackText = document.getElementById('feedback-text');

    if (isCorrect) {
        options.forEach(option => {
            if (option.innerHTML.includes(feedbackImageSrc)) {
                option.classList.add('correct');
            }
        });
        feedbackContainer.style.display = 'none';
        document.getElementById('next-button').style.display = 'block';
    } else {
        options.forEach(option => {
            if (option.innerHTML.includes(feedbackImageSrc)) {
                option.classList.add('incorrect');
            }
        });
        feedbackImage.src = feedbackImageSrc;
        feedbackText.textContent = 'Incorrect. Please review the feedback below.';
        feedbackContainer.style.display = 'block';
    }
}

document.getElementById('next-button').addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex >= shuffledQuestions.length) {
        currentQuestionIndex = 0;
        shuffledQuestions = shuffle(questions.slice());
    }
    loadQuestion();
});

window.onload = loadQuestion;
