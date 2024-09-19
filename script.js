// Kullanıcı verilerini saklamak için localStorage'ı kullanıyoruz
let userData = {
    username: "unknown",  // Kullanıcının adı (gerçek uygulamalarda giriş alınabilir)
    answeredQuestions: [] // Cevapladığı soruların listesi (soruların index'leri)
};

// Tarayıcıda daha önce veri varsa, onu yükle
if (localStorage.getItem('userData')) {
    userData = JSON.parse(localStorage.getItem('userData'));
}

// Soruların karışık sırada gelmesi için bir dizi
const questions = [
    {
        questionImage: "soru1.png",
        choices: ["A", "B", "C", "D", "E"],
        correctAnswerIndex: 2,
        solutionImage: "cozum1.png"
    },
    {
        questionImage: "soru2.png",
        choices: ["A", "B", "C", "D", "E"],
        correctAnswerIndex: 0,
        solutionImage: "cozum2.png"
    },
    // Daha fazla soru ekleyebilirsin
];

// Soruları karıştırma fonksiyonu (Fisher-Yates shuffle algoritması)
function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Kullanıcıya sorulacak soruları karışık sıraya sokuyoruz
let shuffledQuestions = shuffleQuestions([...questions]);

// Şu anki sorunun indeksi
let currentQuestionIndex = 0;

// Soruyu yükle ve cevabı kontrol et
function loadQuestion() {
    // Daha önce cevaplanmamış bir soru bulana kadar ilerle
    while (userData.answeredQuestions.includes(currentQuestionIndex) && currentQuestionIndex < shuffledQuestions.length) {
        currentQuestionIndex++;
    }

    // Eğer tüm sorular bitti ise testi bitir
    if (currentQuestionIndex >= shuffledQuestions.length) {
        alert("Test tamamlandı! Tüm soruları cevapladınız.");
        return;
    }

    const currentQuestion = shuffledQuestions[currentQuestionIndex];

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

    // Çözümü göster
    solutionImage.src = shuffledQuestions[currentQuestionIndex].solutionImage;
    solutionImage.style.display = "block";

    // Cevaplanan soruyu kullanıcının yanıtladığı sorular listesine ekle
    userData.answeredQuestions.push(currentQuestionIndex);

    // Kullanıcı verilerini localStorage'da sakla
    localStorage.setItem('userData', JSON.stringify(userData));

    // Şıkları pasif hale getir
    disableChoices();
}

// Bir sonraki soruya geçiş fonksiyonu
function nextQuestion() {
    currentQuestionIndex++;  // Sonraki soruya geç
    loadQuestion();  // Yeni soruyu yükle
}

// Şıkları pasif hale getirme
function disableChoices() {
    const choices = document.querySelectorAll('.choice');
    choices.forEach(choice => {
        choice.disabled = true;
        choice.style.cursor = "not-allowed";
    });
}

// Test başlarken ilk soruyu yükle
loadQuestion();
