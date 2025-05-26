import { Component, OnInit, ViewChild, HostListener} from '@angular/core';
import { Howl, Howler } from 'howler';
import confetti from 'canvas-confetti';
import { HeaderComponent } from './header/header.component';
import { PollComponent } from './poll/poll.component';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [HeaderComponent, PollComponent,CommonModule,GameComponent,RouterModule],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoading = true;
  title = 'hikayemiz';
  isPlaying = false;
  showGame = false;
  sound: Howl;
  isTransformed:boolean[] = [false,false,false,false,false,false,false,false,false,false,false];
  
  toggleTransform(index: number) {
  this.isTransformed[index] = !this.isTransformed[index];
}

@HostListener('window:scroll', [])
  onWindowScroll() {
    const gameSection = document.getElementById('game');
    if (!gameSection) return;

    const rect = gameSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Oyun alanı görünürse (en azından biraz)
    if (rect.top <= windowHeight && rect.bottom >= 0) {
      this.showGame = true;
    } else {
      this.showGame = false;
    }
  }
  
  ngOnInit() {
    document.body.style.overflow = 'hidden'; // scroll'u kapat
     // Sayfa tamamen yüklendiğinde loading'i kapatmak için basit bir timeout ya da gerçek bir event
    window.addEventListener('load', () => {
      this.isLoading = false;
      document.body.style.overflow = 'auto'; // scroll'u aç
    });
    this.launchConfetti();
    
  }

  constructor() {
    // Müzik nesnesini başlatıyoruz
    this.sound = new Howl({
      src: ['/music.mp3'],
      autoplay: false, // Başlangıçta otomatik çalmasın
      loop: true,
      volume: 0.5,
    });
  }

  launchConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  toggleMusic() {
    if (this.isPlaying) {
      this.sound.pause(); // Müzik durdurulacak
    } else {
      this.sound.play(); // Müzik başlatılacak
    }
    this.isPlaying = !this.isPlaying; // Durumu tersine çeviriyoruz
  }
}
