import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidator } from 'src/app/email.directive';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  formgroup!: FormGroup;

  body: any;
  submitted = false;

  constructor(private fb: FormBuilder, private authSerice: AuthService, private router: Router) {

  }

  ngOnInit(): void {

    this.formgroup = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, emailValidator() ]),
      pwd: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })

  }

  get f() { return this.formgroup.controls; }

  onSubmit() {
    // console.log('form values', this.formgroup.value)
    this.submitted = true;
    if (this.formgroup.invalid) {
      return;
    }

    this.body = {
      username: this.formgroup.value.name,
      email: this.formgroup.value.email,
      password: this.formgroup.value.pwd
    }

    this.authSerice.signupUser(this.body).subscribe(res => {
      console.log('sign up data', res)

      console.log(res);
      const data = res.user;
      localStorage.setItem('token', res.jwt);
      localStorage.setItem('user', JSON.stringify(data));

      localStorage.setItem('role', 'user');
      localStorage.setItem('isAuthenticate', 'true');
      this.router.navigate(['user']);

      // if (data.role_id == "1") {
      //   localStorage.setItem('role', 'admin');
      //   localStorage.setItem('isAuthenticate', 'true');
      //   this.router.navigate(['admin']);
      // } else if (data.role_id == "3") {
      //   localStorage.setItem('role', 'user');
      //   localStorage.setItem('isAuthenticate', 'true');
      //   this.router.navigate(['user']);
      // } else {
      //   alert('Somthing went to wrong !!');
      // }

    })

  }

  get name() {
    return this.formgroup.get('name')!;
  }

  get email() {
    return this.formgroup.get('email')!;
  }

  get pwd() {
    return this.formgroup.get('pwd')!;
  }
}
