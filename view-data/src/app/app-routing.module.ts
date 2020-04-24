import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AboutComponent } from './about/about.component';
import { ViewerComponent } from './viewer/viewer.component';


const routes: Routes = [
  { path: 'albums', component: ListComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
  { path: 'albums/:id', component: ViewerComponent},
  { path: 'albums/new', component: ViewerComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
