import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; 

@Component({
    standalone: true,
  imports: [CommonModule, FormsModule,MatButtonModule],

  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  name: string = '';
  score: number = 0;
  total: number = 0;
  duration: number = 0;
  isPass: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name') || '';
    this.score = parseInt(localStorage.getItem('score') || '0', 10);
    this.total = parseInt(localStorage.getItem('total') || '0', 10);
    const startTime = parseInt(localStorage.getItem('startTime') || '0', 10);
    const endTime = Date.now();
    this.duration = startTime ? Math.floor((endTime - startTime) / 1000) : 0;

    if (!this.name || isNaN(this.score) || isNaN(this.total)) {
      this.router.navigate(['/']);
    }

    this.isPass = this.score > this.total / 2;
  }

  goHome() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  reviewAnswers() {
    this.router.navigate(['/review']);
  }
}
