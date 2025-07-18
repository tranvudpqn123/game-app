import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  score: number;
  message: string = '';
  userChoiceLabel: string = '';
  userChoice: number | null = null;
  systemChoice: number | null = null;
  systemChoiceLabel: string = '';
  choices = [
    { value: 1, label: 'Kéo' },
    { value: 2, label: 'Búa' },
    { value: 3, label: 'Bao' }
  ];
  isGameOver: boolean = false;

  constructor(private scoreService: ScoreService) {
    this.score = this.scoreService.getScore();
  }

  play(choice: number) {
    if (this.isGameOver) return;
    this.userChoice = choice;
    this.systemChoice = Math.floor(Math.random() * 3) + 1;
    this.userChoiceLabel = this.choices.find(x => x.value === this.userChoice)?.label || '';
    this.systemChoiceLabel = this.choices.find(x => x.value === this.systemChoice)?.label || '';
    const result = this.checkResult(this.userChoice, this.systemChoice);
    if (result === 'win') {
      this.score++;
      this.message = 'Bạn thắng!';
    } else if (result === 'lose') {
      this.score--;
      this.message = 'Bạn thua!';
    } else {
      this.message = 'Hoà!';
    }
    this.scoreService.setScore(this.score);
    if (this.score === 10) {
      this.isGameOver = true;
      this.message = 'Chúc mừng! Bạn đã thắng trò chơi!';
    } else if (this.score === 0) {
      this.isGameOver = true;
      this.message = 'Bạn đã thua trò chơi!';
    }
  }

  checkResult(user: number, system: number): 'win' | 'lose' | 'draw' {
    if (user === system) return 'draw';
    if (
      (user === 1 && system === 3) ||
      (user === 2 && system === 1) ||
      (user === 3 && system === 2)
    ) {
      return 'win';
    }
    return 'lose';
  }

  resetGame() {
    this.scoreService.resetScore();
    this.score = 5;
    this.isGameOver = false;
    this.message = '';
    this.userChoice = null;
    this.systemChoice = null;
    this.userChoiceLabel = '';
    this.systemChoiceLabel = '';
  }
}
