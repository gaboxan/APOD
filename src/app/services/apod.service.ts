import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApodService {

  private apiUrl = 'https://api.nasa.gov/planetary/apod';
  private apyKey = '2eOihRAplDJ7tKdwEG0c95EK4QObO0ucpozUryMt'

  constructor(private http: HttpClient) {}

  getApod(): Observable<any> {
    const apiKey = this.apyKey;
    const url = `${this.apiUrl}?api_key=${apiKey}`;
    return this.http.get(url);
  }
}
