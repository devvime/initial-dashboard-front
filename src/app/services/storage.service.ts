import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private http : HttpClient
  ) { }

  get(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  set (key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
