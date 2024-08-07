import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataMoviesService } from 'src/app/services/data-movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {

  constructor(private data: DataMoviesService, private router: ActivatedRoute){}

  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    console.log(getParamId, 'getparamid#');
    // if(getParamId){
    //   this.loading = true;
    // }
    this.loading = true;
    this.getMovie(getParamId);
    this.getVideo(getParamId);
    this.getCast(getParamId);
    this.getProvider(getParamId);

    this.data.getMovieCast(getParamId).subscribe((result)=>{
      console.log(result.cast);
      this.resultCast = result.cast.slice(0,12);
    })
  }


  resultCast:any;
  loading:boolean = false;
  numberId:number = 0;
  prueba:any[]=[];
  movieDetails:any;
  minutosTotales:number = 0;
  horas:number = 0;
  minutos:number = 0;
  tiempoFormateado = ""; 
  getMovieVideoResult:any;
  getMovieCastResult:any;
  setProvider:boolean = false;

  getMovie(id:any){
    this.data.getMovieDetails(id).subscribe((result)=>{
      console.log(result, 'getMovieDetails#');
      this.movieDetails = result;
      console.log("Prueba", this.movieDetails)
      console.log(this.movieDetails.adult);
      this.askRating(this.movieDetails.adult)
      this.genres = this.movieDetails.genres;
      console.log("Genres", this.genres);

      this.minutosTotales = this.movieDetails.runtime;
      console.log("Minute", this.minutosTotales)
      this.horas = Math.floor(this.minutosTotales/60);
      console.log("Horas", this.horas)
      this.minutos = this.minutosTotales%60;
      console.log("minutos", this.minutos)
      console.log(this.tiempoFormateado)
      this.tiempoFormateado = `${this.horas}h ${this.minutos}m`;
      console.log(this.tiempoFormateado)
    })
  }

  getBackgroundImageUrl(posterPath: string): string {
    return `url('https://image.tmdb.org/t/p/original/${posterPath}')`;
  }

  rated:string = "";

  askRating(adult:boolean){
    if(!adult){
      return this.rated = "R";
    } else{
      return this.rated = "P13"
    }
  }

  genres:any[]=[];

  porcentaje(porcentaje: number): number{
    const porcen = (porcentaje/10)*100;
    // console.log("Porcen", porcen);
    const porcenRedondeado = Math.round(porcen);
    return porcenRedondeado;
  }

  

  @Input() progressBar: number = 0;

  isRedBackground(porcentaje:number): boolean {
    const progressBar = this.porcentaje(porcentaje);
    return progressBar >= 1 && this.progressBar <= 30;
  }

  isLightGreenBackground(porcentaje:number): boolean {
    const progressBar = this.porcentaje(porcentaje);
    return progressBar >= 31 && this.progressBar <= 69;
  }

  isDarkGreenBackground(porcentaje:number): boolean {
    const progressBar = this.porcentaje(porcentaje);
    return progressBar >= 70 && progressBar <= 100;
  }

  getVideo(id:any){
    this.data.getMovieVideo(id).subscribe((result) =>{
      console.log(result, "#GetMovieVideo")
      result.results.forEach((element:any) => {
        if(element.type =="Trailer"){
          this.getMovieVideoResult = element.key;
          console.log(this.getMovieVideoResult);
        }
      });
    })
  }

  
  getCast(id:any){
    this.data.getMovieCast(id).subscribe((result)=>{
      console.log(result, "#GetMovieCast");
      this.getMovieCastResult = result;
    })
  }


  logoProvider:string = "";
  nameProvider:string = "";

  getProvider(id:any){
      this.data.getProviderMovie(id).subscribe((result: any) => {
        console.log(result.results.US)
        this.prueba = result.results.US.flatrate[0];
          console.log(this.prueba, "#ResultDune");
          this.logoProvider = result.results.US.flatrate[0].logo_path;
          console.log(this.logoProvider, "#LOGO")
          this.nameProvider = result.results.US.flatrate[0].provider_name;
          console.log(this.nameProvider, "#name")
          // console.log(this.prueba.flatrate)
          if(this.prueba){
            this.setProvider = true;
          }
      });
    
  }

}
