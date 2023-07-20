import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { parser } from '../utils/functions';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient,
    private router: Router,
    private storageService: StorageService
  ) { }

  auth(data) {
    return this.http.post<{ status: number, token: string, error: string }>(`${environment.api.url}/auth`, data, { headers: environment.api.headers }).pipe().toPromise();
  }

  verify() {
    return this.http.get<{ status: number, result: string, error: string }>(`${environment.api.url}/auth/verify`, { headers: environment.api.headers }).pipe().toPromise();    
  }

  async verifyToken() {
    if (!localStorage.getItem('token')) this.router.navigate(['/']);
    environment.api.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    await this.verify().catch(err => this.logOut());
    const token = parser(localStorage.getItem('token'));
    this.storageService.set('currentUser', token);
  }

  recoverPassword(data) {
    return this.http.post<{ status: number, success: string, error: string }>(`${environment.api.url}/auth/recover-pass`, data, { headers: environment.api.headers }).pipe().toPromise();
  }
  
  createNewPassword(data) {
    return this.http.post<{ status: number, success: string, error: string }>(`${environment.api.url}/auth/recover-password`, data, { headers: environment.api.headers }).pipe().toPromise();
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
