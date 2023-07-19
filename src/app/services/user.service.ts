import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http : HttpClient
  ) { }

  register(data) {
    return this.http.post<{ status: number, data: any, error: string }>(`${environment.api.url}/register`, data, { headers: environment.api.headers }).pipe().toPromise();
  }

  show(id: number) {
    return this.http.get<{ status: number, data: any, error: string }>(`${environment.api.url}/user/${id}`, { headers: environment.api.headers }).pipe().toPromise();
  }
}
