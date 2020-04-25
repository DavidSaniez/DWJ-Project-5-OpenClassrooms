import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {LoginDialogComponent} from '../../shared/dialogs/login-dialog/login-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../services/auth.service';

@Injectable()
export class CheckAuthInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(() => {
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            localStorage.removeItem('currentUser');
            this.dialog.open(LoginDialogComponent, {
                width: '450px',
            });
          }
        }
      }));
  }
}
