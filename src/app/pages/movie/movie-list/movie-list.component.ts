import { Component, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Card } from '../../../service/interface/card';
import { MovieService } from '../../../service/movie/movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {
  activateRoute: ActivatedRoute = inject(ActivatedRoute);
  movies$!: Observable<Card[]>;
  sb = new Subscription();
  currentPage: number = 1;
  scrollPosition: number = 0;
  previousUrl: string = '';
  constructor(private movieService: MovieService) {}
  ngOnInit() {
    this.sb = this.movieService
      .getMovies(this.currentPage.toString())
      .subscribe();

    this.movies$ = this.movieService.movieslist$;
  }
  ngOnDestroy() {
    this.sb.unsubscribe();
  }
  onScroll() {
    this.currentPage += 1;
    console.log(this.currentPage);
    this.movieService.getMovies(this.currentPage.toString()).subscribe();
  }
}
