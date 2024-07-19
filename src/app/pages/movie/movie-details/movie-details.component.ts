import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { MovieDetail } from '../../../service/interface/movie';
import { configuration } from '../../../configuration';
import { Video } from '../../../service/interface/video';
import { MovieService } from '../../../service/movie/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent {
  movieId!: number;
  movie!: MovieDetail;
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
    this.route.data.subscribe((data: any) => {
      this.movie = data.moviedetails;
      this.backGroundUrl =
        this.base_url + this.poster_size + this.movie.backdrop_path;
    });
  }
  // this.route.data.subscribe((data: any) => {
  //   this.sb = data.moviedetails.subscribe((res: MovieDetail) => {
  //     this.backGroundUrl =
  //       this.base_url + this.poster_size + res.backdrop_path;
  //   });
  //   this.movie$ = this.movieService.movieDetails$;
  // });
  // this.movie = this.route.snapshot.data['moviedetails'];
  // this.backGroundUrl =
  //   this.base_url + this.poster_size + this.movie.backdrop_path;
  //});
  // this.route.paramMap.subscribe((params) => {
  //   this.movieId = +params.get('id')!;
  //   this.sb = this.movieService
  //     .getMovieById(this.movieId)
  //     .subscribe((res: MovieDetail) => {
  //       this.backGroundUrl =
  //         this.base_url + this.poster_size + res.backdrop_path;
  //     });
  //   this.movie$ = this.movieService.movieDetails$;
  // });

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
