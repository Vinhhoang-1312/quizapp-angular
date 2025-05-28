import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import he from 'he';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; 

@Component({
    standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  he = he;

  questions: any[] = [];
  currQues = 0;
  score = 0;
  options: string[] = [];
  selected?: string;
  userAnswers: any[] = [];
  name: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const q = localStorage.getItem('questions');
    this.name = localStorage.getItem('name') || '';
    this.score = parseInt(localStorage.getItem('score') || '0', 10);
    this.userAnswers = JSON.parse(localStorage.getItem('userAnswers') || '[]');

    if (q) {
      this.questions = JSON.parse(q);
      this.loadOptions();
    } else {
      this.router.navigate(['/']);
    }
  }

  loadOptions() {
    if (!this.questions.length) return;
    const current = this.questions[this.currQues];
    this.options = this.shuffle([
      current.correct_answer,
      ...current.incorrect_answers
    ]);
    this.selected = undefined;
  }

  shuffle(array: string[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  selectOption(option: string) {
    this.selected = option;
    if (option === this.questions[this.currQues].correct_answer) {
      this.score++;
      localStorage.setItem('score', this.score.toString());
    }
    this.userAnswers[this.currQues] = {
      question: this.questions[this.currQues].question,
      correct: this.questions[this.currQues].correct_answer,
      selected: option,
      options: this.options,
      answerText: this.questions[this.currQues].correct_answer
    };
    localStorage.setItem('userAnswers', JSON.stringify(this.userAnswers));
  }

  nextQuestion() {
    if (!this.selected) {
      alert('Please select an option first');
      return;
    }
    if (this.currQues === this.questions.length - 1) {
      localStorage.setItem('total', this.questions.length.toString());
      this.router.navigate(['/result']);
    } else {
      this.currQues++;
      this.loadOptions();
    }
  }

  quitQuiz() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  optionClass(option: string) {
    if (!this.selected) return '';
    if (this.selected === option && this.selected === this.questions[this.currQues].correct_answer) return 'select';
    if (this.selected === option && this.selected !== this.questions[this.currQues].correct_answer) return 'wrong';
    if (option === this.questions[this.currQues].correct_answer) return 'select';
    return '';
  }
}
