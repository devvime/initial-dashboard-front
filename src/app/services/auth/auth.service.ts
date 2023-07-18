import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient
  ) { }

  auth(data) {
    return this.http.post(`${environment.api.url}/auth`, data, { headers: environment.api.headers }).pipe().toPromise();
  }
}
