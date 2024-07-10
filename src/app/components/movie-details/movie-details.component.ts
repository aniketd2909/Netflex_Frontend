import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MovieDetail } from '../../interface/movie';
import { Observable, Subscription } from 'rxjs';
import { MovieService } from '../../service/movie.service';
import { ActivatedRoute } from '@angular/router';
import { configuration } from '../../MockData';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Video } from '../../interface/video';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent {
  movieId!: number;
  movie$!: Observable<MovieDetail>;
  sb = new Subscription();
  backGroundUrl!: string;
  base_url: string = configuration.images.secure_base_url;
  poster_size: string = 'original';
  videos$!: Observable<Video[]>;
  carouselOptions = {
    loop: true,
    nav: true,
    items: 1,
    dots: false,
    navText: ['<', '>'],
  };
  showTrailerFlag: boolean = false;
  constructor(
    private http: HttpClient,
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.movieId = +params.get('id')!;
      this.sb = this.movieService
        .getMovieById(this.movieId)
        .subscribe((res: MovieDetail) => {
          this.backGroundUrl =
            this.base_url + this.poster_size + res.backdrop_path;
        });
      this.movie$ = this.movieService.movieDetails$;
    });
  }

  showTrailer(id: number) {
    this.movieService.getTrailerIDs(id).subscribe();

    this.videos$ = this.movieService.videoList$;

    this.showTrailerFlag = !this.showTrailerFlag;
  }
  closeTrailer() {
    this.showTrailerFlag = !this.showTrailerFlag;
  }
  ngOnDestroy() {
    this.sb.unsubscribe();
  }
}
