import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TheatreModule } from './features/theatre/theatre.module';
import { BookingModule } from './features/booking/booking.module';
import { AdminModule } from './features/admin/admin.module';
import { RepModule } from './features/rep/rep.module';
import { SuggestionModule } from './features/suggestion/suggestion.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TheatreModule,
    BookingModule,
    AdminModule,
    RepModule,
    SuggestionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
