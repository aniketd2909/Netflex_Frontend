import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  inject,
  Renderer2,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  AsyncValidator,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, map, merge, Observable, of } from 'rxjs';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  authservice: AuthService = inject(AuthService);
  registerError: string = '';
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl(
      '',
      [Validators.required, Validators.email],
      [this.asyncCheckEmail()]
    ),
    password: new FormControl('', [Validators.required]),
  });

  get email() {
    return this.registerForm.controls['email'];
  }

  errorMessage = signal('');
  backGroundUrl: string = '/assets/img/Cover-Page2.png';
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

  hide: boolean = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
  }
  onSubmit() {
    this.authservice.registerUser(this.registerForm.value).subscribe(
      (response) => {
        this.router.navigate(['/movielist']); // Navigate to the desired route upon successful login
      },
      (error) => {
        this.registerError = error + ', Check your credentials and try again';
        // this.loginForm.reset({
        //   email: '',
        //   password: '',
        // });
      }
    );
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
