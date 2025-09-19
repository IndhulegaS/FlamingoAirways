import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  bookingID?: number;
  customerID: number;
  flightID: number;
  passengerName: string;
  passengerAge: number;
  passengerGender: string;
  noOfSeats: number;
  bookingDate?: string;
  status?: string;
  customer?: Customer;
  flight?: Flight;
}

export interface Customer {
  customerID: number;
  name: string;
  email: string;
}

export interface Flight {
  flightId: number;
  flightNumber: string;
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  price: number;
  availableSeats: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'https://localhost:7050/api/bookings';

  constructor(private http: HttpClient) {}

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, booking);
  }

  cancelBooking(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
