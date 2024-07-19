import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MovieDetail } from '../../service/interface/movie';
import { MovieService } from '../../service/movie/movie.service';

@Injectable({
  providedIn: 'root',
})
export class ResolverService implements Resolve<MovieDetail> {
  movieService: MovieService = inject(MovieService);
  constructor() {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<MovieDetail> {
    return this.movieService.getMovieById(Number(route.paramMap.get('id')));
  }
}
