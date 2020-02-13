import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators' ;

import { ITrainee } from './model/trainee';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TraineeService {

  constructor(private http: HttpClient) { }

  // Get all Trainee data
  getAllTrainee(url: string): Observable < ITrainee[] > {
    return this.http.get <ITrainee []> (url).pipe(catchError(this.handleError));
  }

  // insert new trainee details
  addTrainee(url: string, trainee: ITrainee): Observable < any > {
    return this.http.post(url, JSON.stringify(trainee), httpOptions)
          .pipe(catchError(this.handleError));
  }

  // Update trainee details
  updateTrainee(url: string, id: number, trainee: ITrainee): Observable < any > {
    const newUrl = `${url}?id=${id}`;
    return this.http.put(newUrl, trainee, httpOptions)
        .pipe(catchError(this.handleError));
  }

  // delete trainee
  deleteTrainee(url: string, id: number): Observable < any > {
    const newUrl = `${url}?id=${id}`;
    return this.http.delete(newUrl, httpOptions)
    .pipe(catchError(this.handleError));
  }


    // custom handler
    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
      } else {
          // the backend returned an unsuccessful response code.
          // the response body may contain clues as to what went wrong,
          console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError('Something bad happened; please try again later.');
  }

}
