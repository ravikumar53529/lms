import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { emailValidator } from 'src/app/email.directive';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {

  formgroup!: FormGroup;

  role: string;

  body!: {};
  isLoading: boolean = false;

  isError: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aurhService: AuthService,
    private snakeBar: MatSnackBar,
    private messageService:MessageService
  ) {
    this.role = 'user';
  }

  ngOnInit(): void {

    this.formgroup = this.fb.group({
      name: new FormControl('', [Validators.required, emailValidator()]),
      pwd: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })

  }

  public onSubmit(): void {
    console.log('form values', this.formgroup.value)

    this.body = {
      identifier: this.formgroup.value.name,//'admin@admin.com',//test@test.com
      password: this.formgroup.value.pwd,//'admin@admin.com',//Password
    }
    this.isLoading = true;
    this.aurhService.loginUser(this.body).subscribe(res => {
      try {
        const data = res.user;
        localStorage.setItem('token', res.jwt);
        localStorage.setItem('user', JSON.stringify(data));
        if (data.role_id == "1") {
          localStorage.setItem('role', 'admin');
          this.isLoading = false;
          localStorage.setItem('isAuthenticate', 'true');

          this.router.navigateByUrl('/admin');
        } else if (data.role_id == "3") {
          localStorage.setItem('role', 'user');
          this.isLoading = false;
          localStorage.setItem('isAuthenticate', 'true');
          this.router.navigate(['user']);
          // location.reload();
        } 
        // else {
        //   this.snakeBar.open('Somthing went to wrong !!', 'Login again', {
        //     horizontalPosition: this.horizontalPosition,
        //     verticalPosition: this.verticalPosition
        //   })
        // }
      } catch (error) {
        console.log('error',error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail:'Somthing went to wrong !! '})
      }
    });

  }

 public get name() {
    return this.formgroup.get('name')!;
  }

 public get pwd() {
    return this.formgroup.get('pwd')!;
  }
}
