import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SuggestionListComponent {
  @Input() suggestions: string[] = [];
}
