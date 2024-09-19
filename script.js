document.addEventListener("DOMContentLoaded", function() {
    // Google Drive'dan soru ve cevap dosyalarını getireceğiz
    let questions = [
        { 
            questionImg: 'https://drive.google.com/uc?export=view&id=<SORU1_ID>',
            answers: ['A', 'B', 'C', 'D', 'E'],
            correctAnswer: 2, // C şıkkı
            explanationImg: 'https://drive.google.com/uc?export=view&id=<CEVAP1_ID>'
        },
        {
            questionImg: 'https://drive.google.com/uc?export=view&id=<SORU2_ID>',
            answers: ['A', 'B', 'C', 'D', 'E'],
            correctAnswer: 0, // A şıkkı
            explanationImg: 'https://drive.google.com/uc?export=view&id=<CEVAP2_ID>'
        },
        {
            questionImg: 'https://drive.google.com/uc?export=view&id=<SORU3_ID>',
            answers: ['A', 'B', 'C', 'D', 'E'],
            correctAnswer: 4, // E şıkkı
            explanationImg: 'https://drive.google.com/uc?export=view&id=<CEVAP3_ID>'
        }
    ];

    let currentQuestionIndex = 0;
    let usedQuestions = [];

    function startTest() {
        shuffleQuestions();
        showQuestion();
    }

    function shuffleQuestions() {
        questions = questions.sort(() => Math.random() - 0.5);
    }

    function showQuestion() {
        const questionContainer = document.getElementById('question-container');
        const answerButtons = document.getElementById('answer-buttons');
        const feedback = document.getElementById('feedback');
        const nextButton = document.getElementById('next-button');

        // Temizle
        feedback.innerHTML = '';
        nextButton.style.display = 'none';
        answerButtons.innerHTML = '';

        // Soru resmi
        const currentQuestion = questions[currentQuestionIndex];
        questionContainer.innerHTML = `<img src="${currentQuestion.questionImg}" alt="Soru">`;

        // Cevap şıkları
        currentQuestion.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.addEventListener('click', () => selectAnswer(index));
            answerButtons.appendChild(button);
        });
    }

    function selectAnswer(selectedIndex) {
        const currentQuestion = questions[currentQuestionIndex];
        const buttons = document.querySelectorAll('#answer-buttons button');
        const feedback = document.getElementById('feedback');
        const nextButton = document.getElementById('next-button');

        buttons.forEach((button, index) => {
            if (index === currentQuestion.correctAnswer) {
                button.classList.add('correct');
            } else if (index === selectedIndex) {
                button.classList.add('wrong');
            }
            button.disabled = true;
        });

        if (selectedIndex === currentQuestion.correctAnswer) {
            nextButton.style.display = 'block';
        } else {
            feedback.innerHTML = `<img src="${currentQuestion.explanationImg}" alt="Çözüm">`;
        }
        
        usedQuestions.push(currentQuestion);
    }

    document.getElementById('next-button').addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            alert("Test tamamlandı!");
            // Kullanıcının aynı soruları görmemesi için gerekli işlemleri yapabilirsiniz.
        }
    });

    startTest();
});
