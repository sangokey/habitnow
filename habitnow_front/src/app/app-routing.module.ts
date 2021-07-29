import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrontComponent } from './front/front.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {path: '', component: FrontComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchComponent},
  {path: 'add', component: AddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
