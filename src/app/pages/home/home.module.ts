import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CoverComponent } from './components/cover/cover.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
const homeRoutes: Routes = [{ path: '', component: HomeComponent }];
@NgModule({
  declarations: [HomeComponent, CoverComponent],
  imports: [SharedModule, RouterModule.forChild(homeRoutes)],
})
export class HomeModule {}
