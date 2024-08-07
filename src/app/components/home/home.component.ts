import { Component, ViewChild, ElementRef, AfterViewInit, Input, Renderer2  } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms'
import { Router } from '@angular/router';
import { DataMoviesService } from 'src/app/services/data-movies.service';
import { SearchServiceService } from 'src/app/services/search-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{


  constructor(private data: DataMoviesService, private router: Router, private searchService: SearchServiceService){
  }


  arrayId:any[]=[];

  ngOnInit():void{

    // this.data.getMovieCast(573435).subscribe((result)=>{
    //   console.log(result.cast);
    //   this.resultCast = result.cast;
    // })



    this.getMoviesByGenre();


    this.data.getSerieVideo(114479).subscribe((result)=>{
      console.log(result);
    })

    let intervalId: any;

    const updateBackPath = () => {
      const randomIndex = Math.floor(Math.random() * this.movieDetails.length);
      this.backPath = this.movieDetails[randomIndex].backdrop_path;

      const newIndex = Math.floor(Math.random() * this.movieDetails.length);            
      this.backPathTrailer = this.movieDetails[newIndex].backdrop_path;
      // console.log("Nuevo backPath:", this.backPath);
  }


  //METODO PARA TRAER TOP ROATED//

    this.data.topRoated().subscribe((result: any) => {
      if (result && result.results) {
        const resultsArray = result.results;
        this.movieDetails = resultsArray;
        // console.log(this.movieDetails)
        updateBackPath(); // Actualiza el backPath inicial        
        intervalId = setInterval(updateBackPath, 5000);
      }
    });


//METODO PARA TRAER TRENDING MOVIES //

    this.data.getMoviePopular().subscribe((result :any)=>{
      this.trendingResult = result.results;
    })


//METODO PARA TRAER ALL TRENDING SERIES Y MOVIES, DIA Y SEMANA//

    if(this.isPopular){
      this.data.getAllTrendingDay().subscribe((result:any)=>{
        this.resultTop = result.results;
        console.log("$REsultTop", this.resultTop)
        this.resultTendencia = result.results;
        this.arrayId = [];
      })
    }


   

//METODO PARA TRAER MOVIES EN CINE

    this.data.getMovieCine().subscribe((result:any)=>{
      this.resultCine = result.results;
      console.log("#ResultCine", this.resultCine)
    })


    if(!this.isRetran && !this.isTv && !this.isAlquiler && !this.isCine){
      this.isPopular = true;
    }
  }

  prueba:any[]=[];

  resultCast:any[]=[];
  resultTendencia:any[]=[];
  resultCine:any[]=[];
  resultTop:any[]=[];
  backPath:string = "";
  movieDetails:any;
  searchVisible = false;
  searchResult:any;
  trendingResult:any[]=[];
  getMovieVideoResult:any;
  backPathTrailer:string = "";

  searchForm = new FormGroup({
    'movieName': new FormControl(null)
  });

  videosTrailer:any[]=[];
  isPopular:boolean = true;
  isCine:boolean = false;
  isAlquiler:boolean = false;
  isTv:boolean = false;
  isRetran:boolean = false;
  showProgressBar: boolean = false;
  trendingHoy:boolean = true;
  trendingWeek:boolean = false;
  fadeOut:boolean = false;

  submitForm(){
    console.log(this.searchForm.value,'searchform#');
    const movieName = this.searchForm.value.movieName;
    this.router.navigate(['/search', movieName]);
  }


  getBackgroundImageUrl(posterPath: string): string {
    return `url('https://image.tmdb.org/t/p/original/${posterPath}')`;
  }

  porcentaje(porcentaje: number): any{
    const porcen = (porcentaje/10)*100;
    const porcenRedondeado = Math.round(porcen);
    if(porcenRedondeado === 0){
      return "soon";
    }
    return porcenRedondeado;
  }

 
  getVideoMovie(id: any) {
    this.data.getMovieVideo(id).subscribe((result) => {
      console.log(result, "#GetMovieVideo")
      result.results.forEach((element: any) => {
        if (element.type == "Trailer") {
          this.getMovieVideoResult = element.key;
          const videoUrl = "https://themoviedb.org/video/play?key=" + this.getMovieVideoResult;
          window.open(videoUrl, "_blank"); // Abre la URL en una nueva ventana o pestaña
        }
      });
    });
  }

  getVideoSerie(id:any){
    this.data.getSerieVideo(id).subscribe((result) =>{
      console.log(result, "#GetMovieVideo")
      result.results.forEach((element:any) => {
        if(element.type =="Trailer"){
          console.log(element.type)
          this.getMovieVideoResult = element.key;
          const videoUrl = "https://themoviedb.org/video/play?key=" + this.getMovieVideoResult;
          console.log(videoUrl);
          window.open(videoUrl, "_blank"); 
        } else{
          console.log("Puede que sea serie")
        }
      });
    })
  }

  checkMediaType(id: any) {
    for (let i = 0; i < this.resultTop.length; i++) {
      const item = this.resultTop[i];
      if (item.id === id) {
        if (item.media_type === "movie") {
          console.log(item.id, item.original_title, "#ES UNA PELÍCULA")
          this.getVideoMovie(id); // Llama a getVideo solo si es una película
        } else {
          console.log("Es serie/tv", item.id, item.original_name);
          console.log("------------------------------------------");
          this.getVideoSerie(id);
        }
        break; // No necesitamos seguir iterando una vez que encontramos el id
      }
    }
  }

  getPopular(){
    this.isPopular = true;
    this.isRetran = false;
    this.isTv = false;
    this.isAlquiler = false;
    this.isCine = false;
    console.log(this.isPopular);
    this.showProgressBar = true; // Mostrar el indicador de progreso
    // Lógica para obtener datos populares

    this.data.getAllTrendingDay().subscribe((result:any)=>{
      this.resultTop = result.results;
      console.log("$REsultTop", this.resultTop)
      this.arrayId = [];
    })

    setTimeout(() => {
      // Simulando una llamada asíncrona (por ejemplo, una solicitud HTTP)
      this.showProgressBar = false; // Ocultar el indicador de progreso después de la carga
    }, 1000); // Simulación de tiempo de carga (2 segundos)


 
  }

  airingToday(){
    this.isRetran = !this.isRetran;
    this.isPopular = false;
    this.isTv = false;
    this.isAlquiler = false;
    this.isCine = false;
    console.log(this.isRetran);
    this.unmarkButton();

    this.data.getSerieAiring().subscribe((result:any)=>{
      this.resultTop = result.results;
      console.log("$TOPMOVIESRESULT", this.resultTop)
    })
  }

  getTv(){
    this.isTv = !this.isTv;
    this.isPopular = false;
    this.isRetran = false;
    this.isAlquiler = false;
    this.isCine = false;
    this.unmarkButton();

    this.data.getSerieOnTheAir().subscribe((result:any)=>{
      this.resultTop = result.results;
      console.log("$TOPMOVIESRESULT", this.resultTop)
    })
  }

  getUpcoming(){
    this.isAlquiler = !this.isAlquiler;
    this.isPopular = false;
    this.isRetran = false;
    this.isTv = false;
    this.isCine = false;
    this.unmarkButton();

    this.data.getMovieUpcoming().subscribe((result:any)=>{
      this.resultTop = result.results;
      console.log("$RESULT: UPCOMING MOVIES", this.resultTop)
    })
  }

  getCine(){
    this.isCine = !this.isCine;
    this.isAlquiler = false;
    this.isPopular = false;
    this.isRetran = false;
    this.isTv = false;
    this.unmarkButton()

    this.data.getMovieCine().subscribe((result:any)=>{
      this.resultTop = result.results;
      console.log("$CINERESULT", this.resultTop)
    })

  }

  unmarkButton(){
    if(!this.isRetran && !this.isTv && !this.isAlquiler && !this.isCine){
      this.isPopular = true;
    }
  }

  getHoyTrending(){
    this.trendingHoy = true;
    this.trendingWeek = false;
    this.fadeOut = true;
    this.showProgressBar = true; 
    setTimeout(() => {
      this.fadeOut = false;
      this.data.getAllTrendingDay().subscribe((result:any)=>{
        this.resultTendencia = result.results;
        console.log("Result Tendencias: ", this.resultTendencia)
      })
      this.showProgressBar = false; // Ocultar el indicador de progreso después de la carga
    }, 1000); // Simulación de tiempo de carga (1 segundos)
  }

  getWeekTrending(){
    this.trendingWeek = !this.trendingWeek;
    this.trendingHoy = false;
    this.fadeOut = true;
    this.showProgressBar = true; 
    setTimeout(() => {
      this.fadeOut = false;
      this.data.getAllTrendingWeek().subscribe((result:any)=>{
        this.resultTendencia = result.results;
        console.log("TRENDINGWEEK:", this.resultTendencia)
      })
      this.showProgressBar = false; // Ocultar el indicador de progreso después de la carga
    }, 500); // Simulación de tiempo de carga (1 segundos)
  }

  // let progressBar = document.querySelector(".circular-progress");
  // let valueContainer = document.querySelector(".value-container");
  // let progressValue = 0;
  // let progressEndValue = 40;
  // let speed = 50;

  // let progress = setInterval(() => {
  //   progressValue++;
  //   valueContainer?.textContent = `${progressValue}%`
  //   progressBar.style.background = `conic-gradient(
  //     #4d5bf9 ${progressValue * 3.6}deg,
  //     #cadcff ${progressValue * 3.6}deg
  //   )`;
  //   if(progressValue == progressEndValue){
  //     clearInterval(progress);
  //   }
  // }, speed)


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

  getRouterLink(prueba: any): any[] {
    if (prueba.media_type === 'movie') {
      return ['/movies', prueba.id];
    } else if (prueba.media_type === 'tv') {
      return ['/series', prueba.id];
    } else {
      // Manejar otros casos o tipos de media_type si es necesario
      return []; // Por defecto, no se redirecciona a ningún lado si no se cumplen las condiciones anteriores
    }
  }

  navigateWithDelay(url: any[]) {
    setTimeout(() => {
      this.router.navigate(url);
    }, 200); 
  }

  // navigateWithDelay(prueba: any) {
  //   setTimeout(() => {
  //     let prueba = this.getRouterLink(prueba);
  //     this.router.navigate(prueba).then(() => {
  //       this.loading = false; 
  //     });
  //   }, 5000);
  // }

  movies:any[] = [];

  getMoviesByGenre(): void {
    this.data.getCategoriaMovie(28).subscribe(
      (result: any) => {
        console.log(result, "hola")
        this.movies = result.results; // Asigna los resultados al arreglo de películas
        console.log('Películas de género Action:', this.movies);
      },
      (error) => {
        console.error('Error al obtener las películas:', error);
      }
    );
  }



}
