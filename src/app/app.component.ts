import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ApodService } from './services/apod.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'qr-generator';
  isChecked = false;
  apodData: any;
  explanationEn = '';
  explanation = '';
  translatedText: string = '';
  apiUrl = 'https://translation.googleapis.com/language/translate/v2'

  constructor(
    private apodService: ApodService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.apodService.getApod().subscribe((data) => {
      this.apodData = data;
      this.explanationEn = data.explanation;
      this.explanation = this.explanationEn;
    });
  }

  Translate() {
    if (this.isChecked) {
      this.http
        .post(
          'https://translation.googleapis.com/language/translate/v2?key=AIzaSyAEqtA0cNydt2i76iKvUcBz0lprF7NbfrU',
          {
            q: [this.explanationEn],
            target: 'es',
          }
        )
        .subscribe(
          (response: any) => {
            if (
              response.data &&
              response.data.translations &&
              response.data.translations[0]
            ) {
              this.translatedText =
                response.data.translations[0].translatedText;
              this.explanation = this.translatedText;
              console.log('traducción:', this.translatedText);
            } else {
              console.error('No se pudo obtener la traducción.');
            }
          },
          (error) => {
            console.error(
              'Error al realizar la solicitud de traducción:',
              error
            );
          }
        );
    } else {
      this.explanation = this.explanationEn;
    }
  }
 
}

