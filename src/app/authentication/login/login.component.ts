import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { emailValidator } from 'src/app/email.directive';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formgroup!: FormGroup

  role: any;

  body: any;

  isErorr: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aurhService: AuthService,
    private snakeBar:MatSnackBar
  ) {
    this.role = 'user';
  }

  ngOnInit(): void {

    this.formgroup = this.fb.group({
      name: new FormControl('', [Validators.required, emailValidator()]),
      pwd: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })

  }

  onSubmit() {
    console.log('form values', this.formgroup.value)

    this.body = {
      identifier: this.formgroup.value.name,//'admin@admin.com',//test@test.com
      password: this.formgroup.value.pwd,//'admin@admin.com',//Password
    }


    this.aurhService.loginUser(this.body).subscribe(res => {
      console.log(res);
      const data = res.user;
      localStorage.setItem('token', res.jwt);
      localStorage.setItem('user', JSON.stringify(data));

      if (data.role_id == "1") {
        localStorage.setItem('role', 'admin');
        localStorage.setItem('isAuthenticate', 'true');
        this.router.navigate(['admin']);
      } else if (data.role_id == "3") {
        localStorage.setItem('role', 'user');
        localStorage.setItem('isAuthenticate', 'true');
        this.router.navigate(['user']);
      } else {
        // alert('Somthing went to wrong !!');
        this.snakeBar.open('Somthing went to wrong !!', 'Login again', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        })
      }

    })

    
    // if (this.role === 'admin') {
    //   // alert('Welcome Admin');
    //   this.router.navigate(['admin']);
    // } else if (this.role === 'user') {
    //   this.router.navigate(['user']);
    // } else {
    //   alert('Something went to wrong !!');
    // }
  }

  get name() {
    return this.formgroup.get('name')!;
  }

  // get email() {
  //   return this.formgroup.get('email')!;
  // }

  get pwd() {
    return this.formgroup.get('pwd')!;
  }
}
