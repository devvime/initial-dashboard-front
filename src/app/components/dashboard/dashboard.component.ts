import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { parser } from 'src/app/utils/functions';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public loading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.verifyToken();
  }

  async verifyToken() {
    if (!localStorage.getItem('token')) this.router.navigate(['/']);
    environment.api.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    this.loading = true;
    await this.authService.verify().catch(err => this.logOut());
    const token = parser(localStorage.getItem('token'));
    localStorage.setItem('currentUser', token);    
    this.loading = false;
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

}
