import { Component } from '@angular/core';
import { DataMoviesService } from 'src/app/services/data-movies.service';
import { FilterServiceService } from 'src/app/services/filter-service.service';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
  title = 'must-watch';

  constructor(private data: DataMoviesService, private filter: FilterServiceService){}

  ngOnInit(): void {
    this.data.topRoated().subscribe((result: any) => {
      if (result && result.results) {
        const resultsArray = result.results;
        this.trendingResult = resultsArray;
        console.log(this.trendingResult)
        for (let i = 0; i < resultsArray.length; i++) {
          const item = resultsArray[i];
          // console.log(item.backdrop_path);
          // console.log(item.original_title);
          // this.porcentaje(item.vote_average);
        }
      }
    });

    this.data.getMovieDesc().subscribe((result:any) => {
      console.log(result,"prueba");
    })
  }
 
  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
  ];

  selectedState: string = this.states[0]; 
  selectedGenres:any[]=[];
  trendingResult:any[]=[];

  
  sortby:string = ""

  buscar() {
    this.filter.selectedStateName$.subscribe(result => {
      this.sortby = result;
    })
    this.filter.trendingResult$.subscribe(results => {
      this.trendingResult = results;
      console.log('Resultados de tendencia actualizados:', this.trendingResult);
      this.data.getMoviesByGenre(results, this.sortby).subscribe((result=>{
        console.log(result);
        this.trendingResult = result.results;
      }))
    });
  }

  genres:any[]=[];

  indexPage:number = 1;

  getBackgroundImageUrl(posterPath: string): string {
    return `url('https://image.tmdb.org/t/p/original/${posterPath}')`;
  }
  
  porcentaje(porcentaje: number): number{
    const porcen = (porcentaje/10)*100;
    // console.log("Porcen", porcen);
    const porcenRedondeado = Math.round(porcen);
    return porcenRedondeado;
  }

  mostrarMas(){
    this.indexPage++;
    this.data.topRoated2(this.indexPage).subscribe((result:any) => {
      // console.log(result.results,"#prueba")
      this.trendingResult.push(...result.results);
      // console.log(this.trendingResult)
    })
  }
}

