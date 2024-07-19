import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
const registerRoutes: Routes = [{ path: '', component: RegisterComponent }];
@NgModule({
  declarations: [RegisterComponent],
  imports: [SharedModule, RouterModule.forChild(registerRoutes)],
})
export class RegisterModule {}
