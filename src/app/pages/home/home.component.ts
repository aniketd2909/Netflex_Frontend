import { Component, Renderer2, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { backgroundUrls } from '../../configuration';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  backgroundUrls: string[] = backgroundUrls;
  errorMessage = signal('');
  backGroundUrl: string = '/assets/img/Home-Page.jpg';
}
