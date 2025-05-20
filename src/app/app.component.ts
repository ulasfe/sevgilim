import { Component, OnInit, ViewChild } from '@angular/core';
import { Howl, Howler } from 'howler';
import confetti from 'canvas-confetti';
import { HeaderComponent } from './header/header.component';
import { PollComponent } from './poll/poll.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [HeaderComponent, PollComponent,CommonModule],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hikayemiz';
  isPlaying = false;
  sound: Howl;
  isTransformed:boolean[] = [false,false,false,false,false,false,false,false,false,false,false];
  
  toggleTransform(index: number) {
  this.isTransformed[index] = !this.isTransformed[index];
}
  
  ngOnInit() {
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
