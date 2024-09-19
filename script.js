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

    solutionImage.style.display = "block";
    disableChoices();
}

function disableChoices() {
    const choices = document.querySelectorAll('.choice');
    choices.forEach(choice => {
        choice.disabled = true;
        choice.style.cursor = "not-allowed";
    });
}

function nextQuestion() {
    // Bir sonraki soruya geçiş için gerekli işlemler yapılabilir.
    alert("Sonraki soru yükleniyor...");
    // Örnek olarak, bu fonksiyonda yeni bir soru ve seçenekler getirilebilir.
}
