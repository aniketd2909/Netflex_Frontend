import { Component, Input } from '@angular/core';
import { configuration } from '../../../configuration';
import { Card } from '../../../service/interface/card';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.scss',
})
export class MovieItemComponent {
  @Input() movie!: Card;
  base_url: string = configuration.images.secure_base_url;
  poster_size: string = 'original';
  profile_size: string = 'original';
  showFullContent: boolean = false;
  constructor(private router: Router) {}
  ngOnInit() {}
  toggleButton(movieId: number) {
    this.router.navigate(['movie', movieId]);

    // this.showFullContent = !this.showFullContent;
  }
}
