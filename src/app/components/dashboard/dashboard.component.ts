import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { welcome } from 'src/app/utils/functions';
import { StorageService } from 'src/app/services/storage.service';
import { User } from 'src/app/interfaces/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public loading: boolean = false;
  public hello: string = '';
  public user: User;

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) { }

  async ngOnInit() {
    this.loading = true;
    await this.authService.verifyToken();
    this.hello = welcome();
    this.user = this.storageService.get('currentUser');
    this.loading = false;
  }

  logOut() {
    this.authService.logOut();
  }

}
