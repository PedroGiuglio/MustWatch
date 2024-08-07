import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataMoviesService } from 'src/app/services/data-movies.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  constructor(private data: DataMoviesService,private route: ActivatedRoute) {}

  searchResult:any;
  movieName:string = "";
  seriesSeleccionado = false;
  peliculasSeleccionado = false;
  contadorSeries:number = 0;
  contadorPeliculas:number = 0;

  ngOnInit(): void {
    // Obtener el parámetro del nombre de la película de la URL
    this.route.params.subscribe(params => {
      this.movieName = params['movieName'];
      console.log('Nombre de la película:', this.movieName);
   // Verificar si hay un nombre de película válido
    if (this.movieName) {
    this.data.getSearchMovie({ movieName: this.movieName }).subscribe((result) => {
      this.searchResult = result.results;
      console.log(this.searchResult, '#pruebaParams');
      this.contadorPeliculas = this.searchResult.length;
    });

    this.data.getSearchSerie({movieName: this.movieName}).subscribe((result) => {
      this.searchResult = result.results;
      console.log(this.searchResult, '#pruebaSerie')
      this.contadorSeries = this.searchResult.length;
    })
  }
  });
  }

  getBackgroundImageUrl(posterPath: string): string {
    return `url('https://image.tmdb.org/t/p/original/${posterPath}')`;
  }
  

  porcentaje(porcentaje: number): number{
    const porcen = (porcentaje/10)*100;
    // console.log("Porcen", porcen);
    const porcenRedondeado = Math.round(porcen);
    return porcenRedondeado;
  }

  mostrarSeries(){
    this.data.getSearchSerie({movieName : this.movieName}).subscribe((result)=>{
 
      this.searchResult = result.results;
      console.log(this.searchResult, "#pruebaSiLlegaSerie")
      this.seriesSeleccionado = true;
      this.peliculasSeleccionado = false;
    })
  }

  mostrarPeliculas(){
    this.data.getSearchMovie({ movieName: this.movieName }).subscribe((result) => {
      this.seriesSeleccionado = false;
      this.peliculasSeleccionado = true;
      this.searchResult = result.results;
      console.log(this.searchResult, '#pruebaParams');
    });
  }

  obtenerPrimerosCienCaracteres(texto: string): string {
    if (texto.length > 100) {
      return texto.substring(0, 100) + '...';
    }
    return texto;
  }
}
