import { Component, OnInit } from '@angular/core';
import { BookingService, Booking } from '../services/booking.service';
import { FlightService, Flight } from '../services/flight.service';
import { CustomerService, Customer } from '../services/customer.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  booking: Booking = {
    customerID: 0,
    flightID: 0,
    passengerName: '',
    passengerAge: 0,
    passengerGender: '',
    noOfSeats: 1
  };

  flights: Flight[] = [];
  customers: Customer[] = [];

  constructor(
    private bookingService: BookingService,
    private flightService: FlightService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loadFlights();
    this.loadCustomers();
  }

  get maxSeats(): number {
    const flight = this.flights.find(f => f.flightID === this.booking.flightID);
    return flight ? flight.availableSeats : 10;
  }

  loadFlights() {
    this.flightService.getFlights().subscribe(data => (this.flights = data));
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe(data => (this.customers = data));
  }

  submitBooking() {
    this.bookingService.createBooking(this.booking).subscribe(() => {
      alert('✅ Booking successful!');
      this.resetForm();
    });
  }

  resetForm() {
    this.booking = {
      customerID: 0,
      flightID: 0,
      passengerName: '',
      passengerAge: 0,
      passengerGender: '',
      noOfSeats: 1
    };
  }
}
