import { Component } from '@angular/core';
import { mockdata } from '../../MockData';
import { Observable } from 'rxjs';
import { Card } from '../../interface/card';
import { MovieService } from '../../service/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {
  items: any[] = mockdata.results;
  movies$ = new Observable<Card[]>();

  constructor(private movieService: MovieService) {}
  ngOnInit() {
    this.movies$ = this.movieService.movieslist$;
    this.movieService.getMovies().subscribe();
  }
}
