import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';                           

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authenticateCredentials(formBody) {
    this.http.post('authenticate', formBody, {observe: "response"})
  }
}
