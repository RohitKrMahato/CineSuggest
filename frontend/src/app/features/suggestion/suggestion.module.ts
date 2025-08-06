import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestionListComponent } from './suggestion-list.component';

@NgModule({
  imports: [CommonModule, SuggestionListComponent],
  exports: [SuggestionListComponent]
})
export class SuggestionModule {}
