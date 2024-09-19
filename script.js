// Sorular ve cevaplar için bir veri yapısı
const questions = [
    {
        questionImage: "soru1.png",  // Sorunun resim dosyası
        choices: ["A", "B", "C", "D", "E"],
        correctAnswerIndex: 2,  // Doğru cevabın dizideki sırası (örneğin 2 = Seçenek C)
        solutionImage: "cozum1.png"  // Çözüm resim dosyası
    },
    {
        questionImage: "soru2.png",
        choices: ["A", "B", "C", "D", "E"],
        correctAnswerIndex: 0,
        solutionImage: "cozum2.png"
    },
    // Daha fazla soru eklenebilir
];

let currentQuestionIndex = 0;  // Şu anki sorunun indeksi

// Sayfaya soruyu yükleyen fonksiyon
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];  // Şu anki soru

    // Soru resmini güncelle
    document.querySelector('.question-image').src = currentQuestion.questionImage;

    // Şıklar butonlarını güncelle
    const choicesButtons = document.querySelectorAll('.choice');
    choicesButtons.forEach((button, index) => {
        button.textContent = currentQuestion.choices[index];  // Şıkkın metni
        button.style.backgroundColor = "#007bff";  // Şıkkın rengini sıfırla
        button.disabled = false;  // Şıklar aktif hale getiriliyor
        button.onclick = () => checkAnswer(button, index === currentQuestion.correctAnswerIndex);
    });

    // Geri bildirim ve çözüm resimlerini gizle
    document.querySelector('.feedback-text').textContent = '';
    document.querySelector('.solution-image').style.display = 'none';
}

// Cevabı kontrol etme fonksiyonu
function checkAnswer(element, isCorrect) {
    const feedbackText = document.querySelector('.feedback-text');
    const solutionImage = document.querySelector('.solution-image');

    if (isCorrect) {
        feedbackText.textContent = "Doğru Cevap!";
        feedbackText.style.color = "green";
        element.style.backgroundColor = "lightgreen";
    } else {
        feedbackText.textContent = "Yanlış Cevap!";
        feedbackText.style.color = "red";
        element.style.backgroundColor = "salmon";
    }

    solutionImage.src = questions[currentQuestionIndex].solutionImage;  // Çözüm resmini güncelle
    solutionImage.style.display = "block";  // Çözümü göster
    disableChoices();
}

// Bir sonraki soruya geçiş
function nextQuestion() {
    currentQuestionIndex++;  // Sonraki soruya geç
    if (currentQuestionIndex < questions.length) {
        loadQuestion();  // Yeni soruyu yükle
    } else {
        alert("Test tamamlandı!");
    }
}

// Şıkları pasif hale getirme
function disableChoices() {
    const choices = document.querySelectorAll('.choice');
    choices.forEach(choice => {
        choice.disabled = true;
        choice.style.cursor = "not-allowed";
    });
}

// İlk soruyu yükle
loadQuestion();
