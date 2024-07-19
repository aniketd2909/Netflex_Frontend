import { Component, inject, Renderer2, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { LoginDetail } from '../../service/interface/LoginDetail';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authservice: AuthService = inject(AuthService);
  loginError: string = '';
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get email() {
    return this.loginForm.controls['email'];
  }
  errorMessage = signal('');
  backGroundUrl: string = '/assets/img/Cover-Page.png';
  constructor(private router: Router, private http: HttpClient) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  hide: boolean = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
  }

  onSubmit() {
    this.authservice.checkSignIn(this.loginForm.value).subscribe(
      (response) => {
        this.router.navigate(['/movie']); // Navigate to the desired route upon successful login
      },
      (error) => {
        console.log(error);
        this.loginError =
          error.error.message + ', Check your login credentials and try again';
        // this.loginForm.reset({
        //   email: '',
        //   password: '',
        // });
      }
    );
    // this.router.navigate(['/movielist']);
  }
}
