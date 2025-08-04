import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestionListComponent } from './suggestion-list.component';

@NgModule({
  declarations: [SuggestionListComponent],
  imports: [CommonModule],
  exports: [SuggestionListComponent]
})
export class SuggestionModule {}
