import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cloud } from './cloud';

@Component({
  selector: 'app-game',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements AfterViewInit {
 @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null = null;

  obstacles: { x: number; y: number; width: number; height: number; image: HTMLImageElement }[] = [];
  obstacleSpawnTimer = 0;
  obstacleImages: HTMLImageElement[] = [];

  clouds: Cloud[] = [];
  cloudImage = new Image();

  gameStarted = false;
  gameEnded = false;
  playerSelected = false;
  selectedPlayer: string | null = null;
  distance = 0;

  // Resimler için
  playerImages: { [key: string]: HTMLImageElement } = {};

  // Zıplayan karakterin pozisyonu
  playerX = 50;
  playerY = 220;
  playerWidth = 50;
  playerHeight = 50;
  velocityY = 0;
  gravity = 1.2;
  jumpStrength = -15;
  isJumping = false;

  animationFrameId: number | null = null;

  difficultySpeed = 3;

  constructor() {}

  loadObstacleImages() {
  const imagePaths = [
    './poop.png',
    './cactus.png',
    './mountain.png'
  ];

  this.obstacleImages = imagePaths.map(path => {
    const img = new Image();
    img.src = path;
    return img;
  });
}

  ngAfterViewInit() {
  this.cloudImage.src = '/cloud.png'; // Bulut resmini buraya koy
  this.loadPlayerImages();
  this.loadObstacleImages();
  this.cloudImage.onload = ()=>{
    this.initClouds();
    this.gameLoop();
  };
  const canvas = this.canvasRef.nativeElement;

  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (this.gameStarted && !this.gameEnded) {
      this.jump();
    }
  }, { passive: false });
  
  window.addEventListener('touchstart', (e) => {
  e.preventDefault(); // kaydırma engellemek için
  if (this.gameStarted && !this.gameEnded) {
    this.jump();
  }
}, { passive: false });
}

  loadPlayerImages() {
    const busra = new Image();
    busra.src = './busra.png'; // Busra resmi, projenin assets klasörüne ekle
    const ulas = new Image();
    ulas.src = './ulas.png'; // Ulaş resmi, aynı şekilde

    this.playerImages['Büşra'] = busra;
    this.playerImages['Ulaş'] = ulas;
  }

  selectPlayer(name: string) {
    this.selectedPlayer = name;
    this.playerSelected = true;
  }

  startGame(difficulty: string) {
    this.gameStarted = true;
    this.gameEnded = false;
    this.distance = 0;
    this.obstacles = [];
    this.obstacleSpawnTimer = 0;

    document.body.style.overflow = 'hidden';

    switch (difficulty) {
      case 'easy':
        this.gravity = 0.5;
        this.difficultySpeed = 3;
        break;
      case 'normal':
        this.gravity = 0.9;
        this.difficultySpeed = 5;
        break;
      case 'hard':
        this.gravity = 1.2;
        this.difficultySpeed = 8;
        break;
    }

    setTimeout(() => {
    const canvas = this.canvasRef?.nativeElement;
    if (canvas) {
      this.ctx = canvas.getContext('2d');
      this.initGame();
    } else {
      console.error('Canvas bulunamadı!');
    }
  }, 500);

    this.playerY = 220;
    this.velocityY = 0;
    this.isJumping = false;

    this.gameLoop();
  }

    initGame() {
    if (!this.ctx) return;

    this.ctx.clearRect(0, 0, 800, 300);
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(50, 200, 30, 30);
  }

  
  spawnObstacle() {
  const height = 40 + Math.random() * 30;
  const randomIndex = Math.floor(Math.random() * this.obstacleImages.length);
  const selectedImage = this.obstacleImages[randomIndex];

  this.obstacles.push({
    x: 800,
    y: 250 - height,
    width: 50,
    height: height,
    image: selectedImage
  });
}

initClouds() {
  this.clouds = [];
  for (let i = 0; i < 5; i++) {  // 5 tane bulut
    this.clouds.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * (window.innerHeight * 0.3),  // üst kısım
      width: 100 + Math.random() * 100,
      height: 50 + Math.random() * 50,
      speed: 0.3 + Math.random() * 0.7  // yavaş hızlarda
    });
  }
}
  gameLoop() {
  this.animationFrameId = requestAnimationFrame(() => this.gameLoop());

   if (!this.ctx) return;
  const canvas = this.canvasRef?.nativeElement;
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.5;
  }
  this.ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Zıplama
  if (this.isJumping) {
    this.velocityY += this.gravity;
    this.playerY += this.velocityY;

    if (this.playerY > 220) {
      this.playerY = 220;
      this.isJumping = false;
      this.velocityY = 0;
    }
  }

  this.clouds.forEach(cloud => {
    cloud.x -= cloud.speed;
    if (cloud.x + cloud.width < 0) {
      cloud.x = canvas.width;
      cloud.y = Math.random() * (canvas.height * 0.3);
    }
    if(this.ctx)
    this.ctx.drawImage(this.cloudImage, cloud.x, cloud.y, cloud.width, cloud.height);
  });

  // Karakter çiz
  const playerImage = this.selectedPlayer ? this.playerImages[this.selectedPlayer] : null;
  if (playerImage && playerImage.complete) {
    this.ctx.drawImage(playerImage, this.playerX, this.playerY, this.playerWidth, this.playerHeight);
  }

 // Engelleri çiz
this.obstacles.forEach((obs, index) => {
  obs.x -= this.difficultySpeed;

  if (this.ctx) {
    if (obs.image.complete) {
      this.ctx.drawImage(obs.image, obs.x, obs.y, obs.width, obs.height);
    } else {
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    }
  }

  if (obs.x + obs.width < 0) {
    this.obstacles.splice(index, 1);
  }

  if (this.checkCollision(obs)) {
    this.endGame();
  }
});


  // Yeni engel üret
  this.obstacleSpawnTimer++;
  if (this.obstacleSpawnTimer > 90) {
    this.spawnObstacle();
    this.obstacleSpawnTimer = 0;
  }

  // Mesafeyi arttır
  this.distance += this.difficultySpeed * 0.1;

  if (this.distance >= 1000) {
    this.endGame();
  }
}


  jump() {
    if (!this.isJumping) {
      this.velocityY = this.jumpStrength;
      this.isJumping = true;
    }
  }

  checkCollision(obstacle: { x: number; y: number; width: number; height: number }): boolean {
  return (
    this.playerX < obstacle.x + obstacle.width &&
    this.playerX + this.playerWidth > obstacle.x &&
    this.playerY < obstacle.y + obstacle.height &&
    this.playerY + this.playerHeight > obstacle.y
  );
}

  endGame() {
    this.gameEnded = true;
    this.gameStarted = false;
    document.body.style.overflow = 'auto';
    this.distance = parseFloat(this.distance.toFixed(1));
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }


  restartGame() {
    this.playerSelected = false;
    this.selectedPlayer = null;
    this.distance = 0;
    this.gameEnded = false;
  }
}
