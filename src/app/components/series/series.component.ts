import { Component } from '@angular/core';
import { DataMoviesService } from 'src/app/services/data-movies.service';
import { FilterServiceService } from 'src/app/services/filter-service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent {

  constructor(private data: DataMoviesService, private filter: FilterServiceService, private router: ActivatedRoute){}

  ngOnInit():void{

    this.data.topRoatedSerie().subscribe((result: any) => {
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
  }

  // states: string[] = [
  //   'Alabadddma',
  //   'Alaska',
  //   'Arizona',
  //   'Arkansas',
  //   'California',
  //   'Colorado',
  //   'Connecticut',
  //   'Delaware',
  //   'Florida',
  // ];


  selectedGenres:any[]=[];
  trendingResult:any[]=[];

  sortby:string = ""

  buscar() {
    this.filter.selectedStateName$.subscribe(result => {
      this.sortby = result;
    })
    this.filter.trendingResult$.subscribe(result => {
      // console.log("RESULT", result);
      // console.log('Resultados de tendencia actualizados:', this.trendingResult);
      this.data.getSeriesByGenre(result, this.sortby).subscribe((result=>{
        console.log(result);
        this.trendingResult = result.results;
      }))
    });
  }

  indexPage:number = 1;

  getBackgroundImageUrl(posterPath: string): string {
    return `url('https://image.tmdb.org/t/p/original/${posterPath}')`;
  }
  

  porcentaje(porcentaje: number): number{
    const porcen = (porcentaje/10)*100;
    const porcenRedondeado = Math.round(porcen);
    return porcenRedondeado;
  }

  mostrarMas(){
    this.indexPage++;
    this.data.topRoatedSerieIndex(this.indexPage).subscribe((result:any) => {
      this.trendingResult.push(...result.results);
    })
  }

}
