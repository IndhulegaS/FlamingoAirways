import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Flight {
  flightID: number;
  flightNumber: string;
  origin: string;
  destination: string;
  travelDate: string;
  availableSeats: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private apiUrl = 'https://localhost:7050/api/flights';

  constructor(private http: HttpClient) {}

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.apiUrl);
  }
}
