import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../../service/auth/auth.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrl: './page1.component.scss',
})
export class Page1Component {
  authservice: AuthService = inject(AuthService);

  email = new FormControl(
    '',
    [Validators.required, Validators.email],
    [this.asyncCheckEmail()]
  );

  // get email() {
  //   return this.registerForm.controls['email'];
  // }

  errorMessage = signal('');
  constructor(private router: Router, private http: HttpClient) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  ngOnInit() {}

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else if (this.email.hasError('hasemail')) {
      this.errorMessage.set('Email already exists');
    }
  }

  onSubmit() {
    const emailValue = this.email.value;
    this.router.navigate(['/register/page2'], {
      queryParams: { email: emailValue },
    });
  }

  private asyncCheckEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.authservice.checkEmail(control.value);
    };
  }
}
interface AsyncValidatorFn {
  (control: AbstractControl):
    | Promise<ValidationErrors | null>
    | Observable<ValidationErrors | null>;
}
