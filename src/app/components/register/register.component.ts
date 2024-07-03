import { Component, ElementRef, Renderer2, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';
import { merge } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  readonly name = new FormControl('', [Validators.required]);

  errorMessage = signal('');
  backGroundUrl: string = '/assets/img/Cover-Page2.png';
  constructor() {
    merge(this.name.statusChanges, this.name.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  ngOnInit() {
    console.log(this.backGroundUrl);
  }

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
}
