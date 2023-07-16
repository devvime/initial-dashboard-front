import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  public formRegister: FormGroup;
  public formRecover: FormGroup;
  public isInvalid = {
    name: false,
    email: false,
    password: false
  };
  public register: boolean = false;
  public recoverPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
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
  }

  handleLogin() {
    this.displayFormLoginError();
  }

  cleanFormError(input) {
    this.isInvalid[input] = false;
  }

  handleRegister() {
    this.displayFormLoginError();
  }

  handleRecover() {
    this.displayFormLoginError();
  }

  displayFormLoginError() {
    if (this.formLogin.value.email === '') this.isInvalid.email = true;
    if (this.formLogin.value.password === '') this.isInvalid.password = true;
    if (this.register) {
      if (this.formRegister.value.name === '') this.isInvalid.name = true;
      if (this.formRegister.value.email === '') this.isInvalid.email = true;
      if (this.formRegister.value.password === '') this.isInvalid.password = true;
    }
  }

}
