import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { parser } from '../../utils/functions'
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loading: boolean = false;
  public formLogin: FormGroup;
  public formRegister: FormGroup;
  public formRecover: FormGroup;
  public formCreateNewPassword: FormGroup;
  public isInvalid = {
    name: false,
    email: false,
    recoverEmail: false,
    password: false,
    createNewPassword: false,
    confirmCreateNewPassword: false
  };
  public register: boolean = false;
  public recoverPassword: boolean = false;
  public createNewPassword: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.verifyToken();
    this.getRouteParams();
    this.createForm();
  }

  async handleLogin() {
    this.displayFormLoginError();
    if (this.isInvalid.email || this.isInvalid.password) return;
    this.loading = true;
    await this.authService.auth(this.formLogin.value).then(res => {
      if (res.status === 200) {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      }
      if (res.status === 401) {
        Swal.fire({
          title: 'Ops!',
          text: res.error,
          icon: 'error',
          confirmButtonText: 'Ok',
          heightAuto: false
        });
      }
    }).catch(err => console.log(err));
    this.loading = false;
  }

  async handleRegister() {
    this.displayFormLoginError();
    if (this.isInvalid.name || this.isInvalid.email || this.isInvalid.password) return;
    this.loading = true;
    await this.userService.register(this.formRegister.value).then(res => {
      if (res.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Registered successfully!',
          icon: 'success',
          confirmButtonText: 'Ok',
          heightAuto: false
        });
        this.register = false;
        this.formLogin.get('email').setValue(this.formRegister.get('email').value);
        this.formLogin.get('password').setValue(this.formRegister.get('password').value);
      }
      if (res.status === 400 || res.error) {
        Swal.fire({
          title: 'Ops!',
          text: res.error,
          icon: 'error',
          confirmButtonText: 'Ok',
          heightAuto: false
        });
      }
    }).catch(err => console.log(err));
    this.loading = false;
  }

  async handleRecover() {
    this.displayFormLoginError();
    if (this.isInvalid.recoverEmail) return;
    this.loading = true;
    await this.authService.recoverPassword(this.formRecover.value).then(res => {
      if (res.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: res.success,
          icon: 'success',
          confirmButtonText: 'Ok',
          heightAuto: false
        });
        this.recoverPassword = false;
      }
      if (res.status === 400 || res.status === 404) {
        Swal.fire({
          title: 'Ops!',
          text: res.error,
          icon: 'error',
          confirmButtonText: 'Ok',
          heightAuto: false
        });
      }
    });
    this.loading = false;
  }

  async handleCreateNewPassword() {
    this.displayFormLoginError();
    if (this.isInvalid.createNewPassword || this.isInvalid.confirmCreateNewPassword) return;
    const data = this.formCreateNewPassword.value;
    const token = parser(atob(this.activatedRoute.snapshot.params['recoverPasswordToken']));
    this.loading = true;
    await this.authService.createNewPassword({ data, token}).then(res => {
      if (res.success) {
        Swal.fire({
          title: 'Success!',
          text: res.success,
          icon: 'success',
          confirmButtonText: 'Ok',
          heightAuto: false
        });
      }
      if (res.error) {
        Swal.fire({
          title: 'Ops!',
          text: res.error,
          icon: 'error',
          confirmButtonText: 'Ok',
          heightAuto: false
        });
      }
      this.createNewPassword = false;
    }).catch(err => console.error(err));
    this.loading = false;
  }

  getRouteParams() {
    if (this.activatedRoute.snapshot.params['recoverPasswordToken'] !== undefined) this.createNewPassword = true;
  }

  createForm() {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.formRegister = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.formRecover = this.formBuilder.group({
      email: ['', Validators.required]
    });
    this.formCreateNewPassword = this.formBuilder.group({
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    });
  }

  displayFormLoginError() {
    if (this.formLogin.value.email === '') this.isInvalid.email = true;
    if (this.formLogin.value.password === '') this.isInvalid.password = true;
    if (this.register) {
      if (this.formRegister.value.name === '') this.isInvalid.name = true;
      if (this.formRegister.value.email === '') this.isInvalid.email = true;
      if (this.formRegister.value.password === '') this.isInvalid.password = true;
    }
    if (this.recoverPassword && this.formRecover.value.email === '') this.isInvalid.recoverEmail = true;  
    if (this.createNewPassword) {
      if (this.formCreateNewPassword.value.newPassword === '') this.isInvalid.createNewPassword = true;
      if (this.formCreateNewPassword.value.confirmNewPassword === '') this.isInvalid.confirmCreateNewPassword = true;
      if (this.formCreateNewPassword.value.newPassword !== this.formCreateNewPassword.value.confirmNewPassword) this.isInvalid.confirmCreateNewPassword = true;
    }
  }

  cleanFormError(input) {
    this.isInvalid[input] = false;
  }

  verifyToken() {
    if (localStorage.getItem('token')) this.router.navigate(['/dashboard']);
  }

}
