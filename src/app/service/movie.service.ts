import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { Card } from '../interface/card';
import { Movie, ResData } from '../interface/movie';
import { title } from 'process';
import { environment } from './../environment/environment';
import { ChangeDetectorRef } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly movieApiUrl = environment.baseurl;
  private readonly httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${environment.apiKey}`,
    }),
  };

  private movies$ = new Subject<Card[]>();

  constructor(private http: HttpClient) {}
  movieslist$ = this.movies$.asObservable();
  getMovies(): Observable<Card[]> {
    return this.http.get<ResData>(this.movieApiUrl, this.httpOptions).pipe(
      map((response) =>
        response.results.map((movie: Movie) => ({
          title: movie.title,
          overview: movie.overview,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
        }))
      ),
      tap((cards: Card[]) => {
        this.movies$.next(cards);
      })
    );
  }
}
