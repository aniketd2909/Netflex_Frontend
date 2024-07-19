import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, Subject, delay, map, tap } from 'rxjs';
import { Card } from '../interface/card';
import { Movie, MovieDetail, ResData } from '../interface/movie';
import { title } from 'process';
import { environment } from '../../environment/environment';
import { ChangeDetectorRef } from '@angular/core';
import { Video, VideoRes } from '../interface/video';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly movieApiUrl = environment.backendMoviesApiUrl;
  private readonly movieDetailUrl = environment.movieDetailUrl;
  private readonly httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${environment.apiKey}`,
    }),
  };

  private movies$ = new BehaviorSubject<Card[]>([]);
  private movie$ = new Subject<MovieDetail>();
  private videos$ = new Subject<Video[]>();

  constructor(private http: HttpClient) {}
  movieslist$ = this.movies$.asObservable();
  movieDetails$ = this.movie$.asObservable();
  videoList$ = this.videos$.asObservable();
  getMovies(currentPage: string): Observable<Card[]> {
    return this.http
      .get<ResData>(`${this.movieApiUrl}/discover/movie?page=${currentPage}}`)
      .pipe(
        map((response) =>
          response.results.map((movie: Movie) => ({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
          }))
        ),
        tap((cards: Card[]) => {
          this.movies$.next([...this.movies$.value, ...cards]);
        })
      );
  }

  getMovieById(id: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(
      `${this.movieApiUrl}/movie/${id}`,
      this.httpOptions
    );

    // .pipe(
    //   // map((response: MovieDetail) => ({
    //   //   id: response.id,
    //   //   title: response.title,
    //   //   overview: response.overview,
    //   //   poster_path: response.poster_path,
    //   //   release_date: response.release_date,
    //   // })),
    //   tap((movieDetail: MovieDetail) => {
    //     this.movie$.next(movieDetail);
    //   })
    // );
  }

  // https://api.themoviedb.org/3/movie/{movie_id}/videos
  getTrailerIDs(id: number): Observable<Video[]> {
    return this.http
      .get<VideoRes>(`${this.movieDetailUrl}/${id}/videos`, this.httpOptions)
      .pipe(
        map((response) => response.results.map((video: Video) => video)),
        tap((videos: Video[]) => {
          this.videos$.next(videos);
        })
      );
  }
}
