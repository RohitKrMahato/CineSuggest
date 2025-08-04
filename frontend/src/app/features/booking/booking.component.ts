import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class BookingComponent {
  @Input() show: any;
  @Output() confirmBooking = new EventEmitter<number>();
  seatNumber: number | null = null;
  message = '';

  onBook() {
    if (this.seatNumber != null) {
      this.confirmBooking.emit(this.seatNumber);
      this.message = 'Booking requested...';
    } else {
      this.message = 'Please enter a seat number.';
    }
  }
}
