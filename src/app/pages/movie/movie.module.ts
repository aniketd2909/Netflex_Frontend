import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AuthGuardService } from '../../core/guard/auth-guard.service';
import { ResolverService } from '../../core/resolver/resolver.service';
const registerRoutes: Routes = [
  {
    path: '',
    component: MovieListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: ':id',
    component: MovieDetailsComponent,
    resolve: { moviedetails: ResolverService },
  },
];

@NgModule({
  declarations: [MovieItemComponent, MovieListComponent, MovieDetailsComponent],
  imports: [SharedModule, RouterModule.forChild(registerRoutes)],
})
export class MovieModule {}
