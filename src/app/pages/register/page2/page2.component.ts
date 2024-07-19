import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrl: './page2.component.scss',
})
export class Page2Component {
  roleOption: string = 'user';
  constructor(private router: Router, private route: ActivatedRoute) {}
  email!: string;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.email = params['email'];
    });
  }
  roleSubmit() {
    this.router.navigate(['/register/page3'], {
      queryParams: { email: this.email, role: this.roleOption },
    });
  }
}
