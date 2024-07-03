import { Component } from '@angular/core';
import { mockdata } from '../../MockData';
import { Observable, Subscription, switchMap } from 'rxjs';
import { Card } from '../../interface/card';
import { MovieService } from '../../service/movie.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {
  items: any[] = mockdata.results;
  movies$!: Observable<Card[]>;
  sb = new Subscription();
  currentPage: number = 1;

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
    console.log('scroll');
    this.movieService.getMovies(this.currentPage.toString()).subscribe();
  }
}
