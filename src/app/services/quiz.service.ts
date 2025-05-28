import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  async fetchQuestions() {
    const response = await axios.get('https://opentdb.com/api.php?amount=5');
    return response.data.results;
  }
}
