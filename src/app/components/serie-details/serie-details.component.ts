import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataMoviesService } from 'src/app/services/data-movies.service';

@Component({
  selector: 'app-serie-details',
  templateUrl: './serie-details.component.html',
  styleUrls: ['./serie-details.component.css']
})
export class SerieDetailsComponent {

  constructor(private data: DataMoviesService, private router: ActivatedRoute){}

  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    console.log(getParamId, 'getparamid#');
    if(getParamId){
      this.loading = true;
    }
      this.getSerie(getParamId);
      this.getProvider(getParamId)
      this.getVideo(getParamId);
    // this.getCast(getParamId);
    // this.getSerie(getParamId);
  }

  loading:boolean = false;

  numberId:number = 0;
  prueba:any[]=[];  
  serieDetails:any;
  genres:any[]=[];
  minutosTotales:number = 0;
  horas:number = 0;
  minutos:number = 0;
  tiempoFormateado = ""; 
  getVideoResult:any;
  getMovieCastResult:any;
  setProvider:boolean = false;


  getSerie(id:any){
    this.data.getSerieDetails(id).subscribe((result)=>{
      console.log(result, 'getMovieDetails#');
      this.serieDetails = result;
      // console.log("Prueba", this.movieDetails)
      // console.log(this.movieDetails.adult);
      this.askRating(this.serieDetails.adult)
      this.genres = this.serieDetails.genres;
      // console.log("Genres", this.genres);

      this.minutosTotales = this.serieDetails.runtime;
      // console.log("Minute", this.minutosTotales)
      this.horas = Math.floor(this.minutosTotales/60);
      // console.log("Horas", this.horas)
      this.minutos = this.minutosTotales%60;
      // console.log("minutos", this.minutos)
      // console.log(this.tiempoFormateado)
      this.tiempoFormateado = `${this.horas}h ${this.minutos}m`;
      // console.log(this.tiempoFormateado)
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
    this.data.getSerieVideo(id).subscribe((result) =>{
      result.results.forEach((element:any) => {
        if(element.type =="Trailer"){
          this.getVideoResult = element.key;
          console.log(this.getVideoResult);
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
      this.data.getProviderSerie(id).subscribe((result: any) => {
        console.log(result.results.US)
        this.prueba = result.results.US.flatrate[0];
          this.logoProvider = result.results.US.flatrate[0].logo_path;
          this.nameProvider = result.results.US.flatrate[0].provider_name;
          if(this.prueba){
            this.setProvider = true;
          }
      });
  }
}
