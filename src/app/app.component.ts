import { Component } from '@angular/core';
import { RespuestaTopRotados } from './respuesta';
import {FormControl, FormGroup} from '@angular/forms'
import { Router } from '@angular/router';
import { DataMoviesService } from 'src/app/services/data-movies.service';
import { SearchServiceService } from 'src/app/services/search-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'must-watch';

  constructor(private data: DataMoviesService, private searchService: SearchServiceService, private router: Router){}

  ngOnInit():void{
 
  }

  searchVisible:boolean = true;

  toggleSearch(isVisible: boolean = true) {
    this.searchService.toggleSearchVisibility(isVisible);
    this.searchVisible = !this.searchVisible;
    console.log(this.searchVisible);
  }

  toggleSearchFalse(isVisible: boolean = false){
    this.searchService.toggleSearchVisibility(isVisible);
    this.searchVisible = !this.searchVisible;
  }

  
  searchResult:any;
  searchForm = new FormGroup({
    'movieName': new FormControl(null)
  });

  submitForm(){
    console.log(this.searchForm.value,'searchform#');
    const movieName = this.searchForm.value.movieName;
    this.router.navigate(['/search', movieName]);
    // this.data.getSearchMovie(this.searchForm.value).subscribe((result)=>{
    //   console.log(result, 'searchMovie#');
    //   this.searchResult = result.results;
    //   const movieName = this.searchForm.value.movieName;
    //   this.router.navigate(['/search', movieName]);
    // })
  }

}
