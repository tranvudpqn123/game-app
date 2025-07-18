import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private readonly SCORE_KEY = 'game_score';

  constructor() { }

  getScore(): number {
    const score = localStorage.getItem(this.SCORE_KEY);
    return score ? +score : 5;
  }

  setScore(score: number): void {
    localStorage.setItem(this.SCORE_KEY, score.toString());
  }

  resetScore(): void {
    this.setScore(5);
  }
}
