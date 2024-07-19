import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrl: './page3.component.scss',
})
export class Page3Component {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  authservice: AuthService = inject(AuthService);
  constructor(private router: Router, private route: ActivatedRoute) {}
  email!: string;
  hide: boolean = true;
  role!: string;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.email = params['email'];
      this.role = params['role'];
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
  }
  onSubmit() {
    this.router.navigate(['register', 'page2']);
    this.authservice
      .registerUser({
        ...this.registerForm.value,
        email: this.email,
        role: this.role,
      })
      .subscribe((response) => {
        this.router.navigate(['/movie']);
      });
  }
}
