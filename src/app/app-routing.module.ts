import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './components/movies/movies/movies.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { HomeComponent } from './components/home/home.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SerieDetailsComponent } from './components/serie-details/serie-details.component';
import { SeriesComponent } from './components/series/series.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:"home", component:HomeComponent},
  {path:"search/:movieName", component: SearchResultsComponent},
  {path:"movies", component:MoviesComponent},
  {path:"movies/:id", component:MovieDetailsComponent},
  {path:"series", component:SeriesComponent},
  {path:"series/:id", component:SerieDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
