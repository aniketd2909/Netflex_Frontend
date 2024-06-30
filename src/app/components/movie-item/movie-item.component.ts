import { Component, Input } from '@angular/core';
import { configuration, mockdata } from '../../MockData';
import { Card } from '../../interface/card';

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
  ngOnInit() {}
  toggleButton() {
    this.showFullContent = !this.showFullContent;
  }
}
