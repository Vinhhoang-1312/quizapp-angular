import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import he from 'he';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review',
  standalone: true,
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class ReviewComponent implements OnInit {
  userAnswers: any[] = [];
  he = he;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userAnswers = JSON.parse(localStorage.getItem('userAnswers') || '[]');
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
