import { Component, ElementRef, Renderer2, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { merge } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get name() {
    return this.registerForm.controls['name'];
  }
  errorMessage = signal('');
  backGroundUrl: string = '/assets/img/Cover-Page2.png';
  constructor(private router: Router) {
    merge(this.name.statusChanges, this.name.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  ngOnInit() {}

  updateErrorMessage() {
    if (this.name.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else {
      this.errorMessage.set('');
    }
  }

  hide: boolean = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
  }
  onSubmit() {
    // console.log(this.registerForm.value);
    this.router.navigate(['/movielist']);
  }
}
