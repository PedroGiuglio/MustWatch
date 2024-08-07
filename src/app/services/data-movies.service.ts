import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaTopRotados } from '../respuesta';


@Injectable({
  providedIn: 'root'
})
export class DataMoviesService {

  constructor(private http : HttpClient) { }
  
  readonly baseUrl="https://api.themoviedb.org/3";
  apiKey = "1b6a527e9c6606b62bbe9ce55b9d0943";

  getMovie():Observable<any[]>{
    return this.http.get<any>(this.baseUrl)
  }

  topRoated(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/trending/movie/day?api_key=${this.apiKey}`)
  } 

  topRoated2(data:number): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/trending/movie/day?api_key=${this.apiKey}&page=${data}`)
  } 

  topRoatedSerie(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/trending/tv/day?api_key=${this.apiKey}`)
  } 

  topRoatedSerieIndex(data:number): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/trending/tv/day?api_key=${this.apiKey}&page=${data}`)
  } 


  getMoviePopular(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`)
  } 

  getMovieTopRated(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}`)
  }

  getMovieDetails(data:any): Observable <any> {
    return this.http.get(`${this.baseUrl}/movie/${data}?api_key=${this.apiKey}`)
  }

  getMovieVideo(data:any): Observable <any>{
    return this.http.get(`${this.baseUrl}/movie/${data}/videos?api_key=${this.apiKey}`)
  }

  getMovieCast(data:any): Observable <any>{
    return this.http.get(`${this.baseUrl}/movie/${data}/credits?api_key=${this.apiKey}`)
  }

  getSearchMovie(data:any): Observable <any>{
    console.log('URL de búsqueda:', `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${data.movieName}`);
    return this.http.get(`${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${data.movieName}`)
  }

  getSearchSerie(data:any): Observable <any>{
    console.log('URL de búsqueda:', `${this.baseUrl}/search/serie?api_key=${this.apiKey}&query=${data.movieName}`);
    return this.http.get(`${this.baseUrl}/search/tv?api_key=${this.apiKey}&query=${data.movieName}`)
  }

  getAllTrendingDay(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/trending/all/day?api_key=${this.apiKey}`)
  } 

  getAllTrendingWeek(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/trending/all/week?api_key=${this.apiKey}`)
  } 

  getSerieDetails(data:any): Observable <any> {
    return this.http.get(`${this.baseUrl}/tv/${data}?api_key=${this.apiKey}`)
  }

  getSerieVideo(data:any): Observable <any>{
    return this.http.get(`${this.baseUrl}/tv/${data}/videos?api_key=${this.apiKey}`)
  }

  // TIPOS DE TRAILERS //

  getMovieCine(): Observable <any>{
    return this.http.get(`${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}`)
  }

  getMovieUpcoming(): Observable <any> {
    return this.http.get(`${this.baseUrl}/movie/upcoming?api_key=${this.apiKey}`)
  }

  getSerieAiring():Observable <any>{
    return this.http.get(`${this.baseUrl}/tv/airing_today?api_key=${this.apiKey}`)
  }

  getSerieOnTheAir():Observable <any>{
    return this.http.get(`${this.baseUrl}/tv/on_the_air?api_key=${this.apiKey}`)
  }

  //PROVIDERS//

  getProviderMovie(movie_id:number): Observable <any>{
    return this.http.get(`${this.baseUrl}/movie/${movie_id}/watch/providers?api_key=${this.apiKey}`)
  }

  getProviderSerie(serie_id:number): Observable <any>{
    return this.http.get(`${this.baseUrl}/tv/${serie_id}/watch/providers?api_key=${this.apiKey}`)
  }

  //FILTROS POR GÉNERO - MOVIES//

  getGenreMovie(): Observable <any>{
    return this.http.get(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`)
  }

  getCategoriaMovie(genreId: number):Observable<any>{
   return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}`);
  }

  getMoviesByGenre(genreIds:number[], sortby:string): Observable<any> {
    const genreParams = genreIds.join('%2C'); // Une los IDs de género separados por coma
    return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreParams}&sort_by=${sortby}`);
  }

  //FILTROS POR GÉNERO - SERIES //

  getGenreSerie(): Observable <any>{
    return this.http.get(`${this.baseUrl}/genre/tv/list?api_key=${this.apiKey}`)
  }

  getSeriesByGenre(genreIds:number[], sortby:string): Observable<any> {
    const genreParams = genreIds.join('%2C'); // Une los IDs de género separados por coma
    return this.http.get(`${this.baseUrl}/discover/tv?api_key=${this.apiKey}&with_genres=${genreParams}&sort_by=${sortby}`);
  }

  //FILTER ASC AND DESC //

  getMovieDesc(){
    return this.http.get<any>(`${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}&sort_by=popularity.desc`)
  }




}
