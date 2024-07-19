import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { Page1Component } from './components/page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { Page3Component } from './page3/page3.component';
const registerRoutes: Routes = [
  { path: '', component: Page1Component },
  { path: 'page2', component: Page2Component },
  { path: 'page3', component: Page3Component },
];
@NgModule({
  declarations: [Page1Component, Page2Component, Page3Component],
  imports: [SharedModule, RouterModule.forChild(registerRoutes)],
})
export class RegisterModule {}
