import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { emailValidator } from 'src/app/email.directive';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService]
})
export class SignupComponent {

  formgroup!: FormGroup;

  body: any;
  submitted = false;

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authSerice: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.formgroup = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, emailValidator()]),
      pwd: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  public get f() { return this.formgroup.controls; }

  public onSubmit(): void {
    this.submitted = true;
    if (this.formgroup.invalid) {
      return;
    }

    this.body = {
      username: this.formgroup.value.name,
      email: this.formgroup.value.email,
      password: this.formgroup.value.pwd
    }
    this.isLoading = true;
    this.authSerice.signupUser(this.body).subscribe(res => {
      console.log('sign up data', res)
      try {
        console.log(res);
        const data = res.user;
        localStorage.setItem('token', res.jwt);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('role', 'user');
        localStorage.setItem('isAuthenticate', 'true');
        this.router.navigate(['user']);
        this.isLoading = false;
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went to wrong !!' });
      }
    });
  }

  public get name() {
    return this.formgroup.get('name')!;
  }

  public get email() {
    return this.formgroup.get('email')!;
  }

  public get pwd() {
    return this.formgroup.get('pwd')!;
  }
}
