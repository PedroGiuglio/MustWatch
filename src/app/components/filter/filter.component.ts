import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataMoviesService } from 'src/app/services/data-movies.service';
import { FilterServiceService } from 'src/app/services/filter-service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Input() genres: any[]=[]; // Input para los géneros
  @Output() buscarEvent = new EventEmitter<void>(); // Output para el evento de buscar


  constructor(private data: DataMoviesService, private filter: FilterServiceService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    const segments = this.router.snapshot.url;
    if (segments.length > 0 && segments[0].path === 'series') {
        console.log('Estás en la ruta de seriesss');
        this.data.getGenreSerie().subscribe((result)=>{
          this.genres = result.genres;
          console.log(this.genres)
        })    
        this.states = [
          {title: "Popularidad descendente", value: "popularity.desc"},
          {title: "Popularidad ascendente", value: "popularity.asc"},
          {title: "Valoración descendente", value: "vote_average.dsc"},
          {title: "Valoración ascendente", value: "vote_average.asc"},
          {title: "Primera fecha de emisión descendente", value: "first_air_date.desc"},
          {title: "Primera fecha de emisión ascendente", value: "first_air_date.asc"},
          {title: "Nombre (A-Z)", value: "name.desc"},
          {title: "Nombre (Z-A)", value: "name.asc"},
        ];
        
    } else {
        this.data.getGenreMovie().subscribe((result)=>{
          this.genres = result.genres;
        })       
        console.log('No estás en la ruta de series');
        this.states = [
          {title: "Popularidad descendente", value: "popularity.desc"},
          {title: "Popularidad ascendente", value: "popularity.asc"},
          {title: "Valoración descendente", value: "vote_average.desc"},
          {title: "Valoración ascendiente", value: "vote_average.asc"},
          {title: "Fecha de estreno descendente", value: "primary_release_date.desc"},
          {title: "Fecha de estreno ascendente", value: "primary_release_date.asc"},
          {title: "Nombre (A-Z)", value: "original_title.desc"},
          {title: "Nombre (Z-A)", value: "original_title.asc"},
        ];
    }
  }



  states:any[]=[];

  // selectedState: string = this.states[1];  
    selectedState: string = this.states[1];  


  onStateSelectionChange(event: any) {
    console.log('Estado seleccionado:', this.selectedState);
  }

  selectedGenres:any[]=[];

  onGenreChange(event: any, genreId: number): void {
    if (event.target.checked) {
      // Agrega el género seleccionado al array de géneros seleccionados
      this.selectedGenres.push(genreId);
    } else {
      // Remueve el género no seleccionado del array de géneros seleccionados
      const index = this.selectedGenres.indexOf(genreId);
      if (index !== -1) {
        this.selectedGenres.splice(index, 1);
      }
    }
    console.log("Géneros seleccionados:", this.selectedGenres);
  }

  isSelected(genreId: number): boolean {
    return this.selectedGenres.includes(genreId);
  }

  trendingResult:any[]=[];
  
  sortby:string = ""

  buscar(){
    // Llamamos al servicio para actualizar los resultados en el componente principal
    this.filter.updateTrendingResult(this.selectedGenres);
    this.filter.updateSelectedStateName(this.selectedState);
    console.log(this.selectedState,"eewww")
    this.buscarEvent.emit();
  }



}
