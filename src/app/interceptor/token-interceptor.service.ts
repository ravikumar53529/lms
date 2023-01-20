import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable , throwError } from 'rxjs';
// import { Observable } from 'rxjs/internal/Observable';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
 token:any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private router: Router,private snackBar:MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem("token");
    request = request.clone({
      headers: request.headers.set('Authorization', `appAuthName=${this.token}`),
    });
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.status === 401) {
          alert('Unauthorized request. Login again');

          // this.toastrService.error('Unauthorized request', 'Login again');
        }
        else if (error.status === 500) {
          alert('Internal server error. Login again');
          // this.toastrService.error('Internal server error', 'Login again');
        }
        else {
          // alert('Something went wrong. Login again');
          this.snackBar.open('Something went wrong', 'Login again',{
            horizontalPosition:this.horizontalPosition,
            verticalPosition:this.verticalPosition
          });
          // this.toastrService.error('Something went wrong', 'Login again');
        }
        localStorage.clear();
        this.router.navigate(['login']);
        return throwError(errorMessage);
      })
    );
  }
}
