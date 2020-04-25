import {Component, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginDialogComponent} from '../../login-dialog/login-dialog.component';
import {AuthService} from '../../../../core/services/auth.service';
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent {

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password_confirmation: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    public dialog: MatDialog, public authService: AuthService,
    private toastrService: ToastrService) {

  }

  register() {
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.get(key).markAsDirty();
      this.registerForm.get(key).markAllAsTouched();
      this.registerForm.get(key).updateValueAndValidity();
    });

    if (this.registerForm.valid) {
      this.authService.register(
        this.registerForm.controls.name.value,
        this.registerForm.controls.email.value,
        this.registerForm.controls.password.value,
        this.registerForm.controls.password_confirmation.value);
      this.onNoClick();
      this.toastrService.success('Votre compte à bien été crée');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getPasswordErrors() {
    if (this.registerForm.controls.password.hasError('required')) {
      return 'Le champ password est requis';
    }
    return this.registerForm.controls.password.hasError('minlength') ? 'Le mot de passe doit contenir 8 caractères minimum' : '';

  }

  getErrorMessage() {
    if (this.registerForm.controls.email.hasError('required')) {
      return 'Le champ email est requis';
    }

    return this.registerForm.controls.email.hasError('email') ? 'L\'email n\'est pas valide' : '';
  }

}
