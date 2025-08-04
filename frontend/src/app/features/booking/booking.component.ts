import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
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
