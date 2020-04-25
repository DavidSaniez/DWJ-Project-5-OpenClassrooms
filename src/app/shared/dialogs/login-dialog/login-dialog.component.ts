import {ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {RegisterDialogComponent} from '../register-dialog/register-dialog/register-dialog.component';

class DialogOverviewExampleDialog {
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private authService: AuthService,
    public dialog: MatDialog, ) {
  }

  login() {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key).markAsDirty();
      this.loginForm.get(key).markAllAsTouched();
      this.loginForm.get(key).updateValueAndValidity();
    });

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
      this.dialogRef.close();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getErrorMessage() {
    if (this.loginForm.controls.email.hasError('required')) {
      return 'Le champ email est requis';
    }

    return this.loginForm.controls.email.hasError('email') ? 'L\'email n\'est pas valide' : '';
  }

  getPasswordErrors() {
    if (this.loginForm.controls.password.hasError('required')) {
      return 'Le champ password est requis';
    }
    return this.loginForm.controls.password.hasError('minlength') ? 'Le mot de passe doit contenir 8 caractères minimum' : '';
  }
}
