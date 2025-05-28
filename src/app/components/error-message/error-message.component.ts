import { Component } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: true,
  template: `<div class="error-message"><ng-content></ng-content></div>`,
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {}