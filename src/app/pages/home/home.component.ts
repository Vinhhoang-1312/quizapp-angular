import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [FormsModule, ErrorMessageComponent, CommonModule]
})
export class HomeComponent {
  name: string = '';
  error: boolean = false;

  constructor(private quizService: QuizService, private router: Router) {}

  async startQuiz() {
    if (!this.name.trim()) {
      this.error = true;
      return;
    }
    this.error = false;
    localStorage.setItem('name', this.name);
    localStorage.setItem('score', '0');
    localStorage.setItem('startTime', Date.now().toString());
    localStorage.setItem('userAnswers', JSON.stringify([]));

    const questions = await this.quizService.fetchQuestions();
    localStorage.setItem('questions', JSON.stringify(questions));

    this.router.navigate(['/quiz']);
  }
}