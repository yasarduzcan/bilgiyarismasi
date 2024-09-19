const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost/test_platform', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  name: String,
  completedQuestions: [Number], // Kullanıcının tamamladığı soru ID'leri
});

const User = mongoose.model('User', userSchema);

app.use(express.json());

app.post('/submitAnswer', async (req, res) => {
  const { userId, questionId, isCorrect } = req.body;
  
  // Kullanıcı cevabı doğruysa, soruyu completedQuestions'a ekle
  if (isCorrect) {
    await User.updateOne({ _id: userId }, { $push: { completedQuestions: questionId } });
  }
  
  res.json({ message: 'Cevap kaydedildi' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
