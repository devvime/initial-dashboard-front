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
    return this.http.post<{ status: number, token: string, error: string }>(`${environment.api.url}/auth`, data, { headers: environment.api.headers }).pipe().toPromise();
  }

  verify() {
    return this.http.get<{ status: number, result: string, error: string }>(`${environment.api.url}/auth/verify`, { headers: environment.api.headers }).pipe().toPromise();    
  }

  recoverPassword(data) {
    return this.http.post<{ status: number, success: string, error: string }>(`${environment.api.url}/auth/recover-pass`, data, { headers: environment.api.headers }).pipe().toPromise();
  }
  
  createNewPassword(data) {
    return this.http.post<{ status: number, success: string, error: string }>(`${environment.api.url}/auth/recover-password`, data, { headers: environment.api.headers }).pipe().toPromise();
  }
}
