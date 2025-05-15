import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent {
  questions = [
    {
      text: 'Beni ilk nerede gördün?',
      options: ['Okulda', 'Parkta', 'Instagram', 'Rüyanda'],
      correctAnswer: 'Instagram',
      answer: '',
      isCorrect: false
    },
    {
      text: 'En çok neyi birlikte yapmayı seviyoruz?',
      options: ['Film izlemek', 'Gezmeye çıkmak', 'Sohbet etmek', 'Yemek yemek'],
      correctAnswer: 'Gezmeye çıkmak',
      answer: '',
      isCorrect: false
    },
    {
      text: 'İlişkimizi aşağıdakilerden hangisine benzetiyorsun?',
      options: ['Leyla ile Mecnun', 'Ferhat ile Şirin', 'Küçük Prens ile Gül', 'Hiçbiri'],
      correctAnswer: 'Hiçbiri',
      answer: '',
      isCorrect: false
    },
    {
      text: 'Benimle ilgili en sevmediğin özelliğim ne?',
      options: ['Çocuk gibi olmam', 'Bazen fazla ısrar ediyorum?', 'Kötüle birşey olmaz demem!', 'Sevmediğin bir yanım yok :)'],
      correctAnswer: 'Sevmediğim bir yanın yok :)',
      answer: '',
      isCorrect: false
    },
    {
      text: 'Sana ettiğim ilk iltifat neydi?',
      options: ['Sen çok güzelsin sebepsiz de gülebilirsin', 'Sesin çok güzelmiş', 'Sen çok güzelsin habersiz de fotoğraf çekilebilirsin', 'Hatırlamıyorum :('],
      correctAnswer: 'Sen çok güzelsin habersiz de fotoğraf çekilebilirsin',
      answer: '',
      isCorrect: false
    },
    {
      text: 'Yarın ne yapmak istersin ?',
      options: ['Dalışa gidelim 🤿', 'Yamaç paraşütü 🪂', 'Baş başa vakit geçirelim 🍷', 'Aklıma daha güzel bir fikir geldi💡'],
      correctAnswer: 'Dalışa gidelim 🤿',
      answer: '',
      isCorrect: false
    },
    {
      text: 'Gelelim içecek seçimine :)',
      options: ['Rakı', 'Şarap', 'Votka + Gazoz', 'Şampanya'],
      correctAnswer: 'Rakı',
      answer: '',
      isCorrect: false
    },
    {
      text: 'Sıra yemekte, ne yemek istersin ?',
      options: ['Tavuk', 'Balık', 'Et', 'Zeytinyağlılar'],
      correctAnswer: 'Tavuk',
      answer: '',
      isCorrect: false
    },
    {
      text: 'Sence doğum günü hediyen ne?',
      options: ['Kolye', 'Bileklik', 'Kulaklık', 'Bu web sitesi :)', 'Sayın Fenerli'],
      correctAnswer: 'Kolye',
      answer: '',
      isCorrect: false
    },
    {
      text: 'Bu siteyi nasıl buldun?',
      options: ['Harika!', 'Çok tatlı', 'Biraz daha geliştirilebilir', 'Hiç fena değil'],
      correctAnswer: 'Harika!',
      answer: '',
      isCorrect: false
    }
  ];

  submitted = false;
get correctAnswerCount(): number {
  return this.questions.filter(q => q.isCorrect).length;
}
  submitAnswers() {
    this.submitted = true;
    this.questions.forEach(q => {
      q.isCorrect = q.answer === q.correctAnswer;
    });
  }
}
