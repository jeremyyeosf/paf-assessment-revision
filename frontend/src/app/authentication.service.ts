import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';      
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginCredentials } from './models';                     

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loginCredentials: LoginCredentials

  constructor(private http: HttpClient) { }

  aauthenticateCredentials(formBody) {
    this.http.post('/authenticate', formBody, {observe: "response"}).toPromise()
      .then(result => {
        console.log(result)
      })
  }

  authenticateCredentials(formBody): Observable<any> {
    return this.http.post<any>('/authentication', formBody, {observe: "response"}).pipe(
      tap((result: any) => console.log(`post login to express`)),
      catchError(this.handleError<any>())
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      return of(result as T)
    }
  }

}
