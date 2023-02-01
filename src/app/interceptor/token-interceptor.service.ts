import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  token: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private router: Router, private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem("token");
    if (request.url !== 'api/auth/local') {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.token}`).set("Access-Control-Allow-Origin", "*"),
      });
    }

    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.status === 401) {
          this.snackBar.open('Unauthorized request.', 'Login again', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
          });
        }
        else if (error.status === 500) {
          this.snackBar.open('Internal server error', 'Login again', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
          });
        }
        else {
          this.snackBar.open('Something went wrong', 'Login again', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
          });
        }
        localStorage.clear();
        this.router.navigate(['login']);
        return throwError(errorMessage);
      })
    );
  }
}
