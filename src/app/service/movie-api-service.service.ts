// movie-api-service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // This should ensure the service is available app-wide
})
export class MovieApiService {

  constructor(private http: HttpClient) { }

  bannerApiData(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/movie/1`);
  }

  // trendingmovieapidata 
  trendingMovieApiData(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/movie/7`);
  }

  // action 
  fetchActionMovies(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/movie/2`);
  }

  // adventure
  fetchAdventureMovies(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/movie/3`);
  }

  // animation
  fetchAnimationMovies(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/movie/4`);
  }

  // comedy
  fetchComedyMovies(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/movie/5`);
  }

  // documentary
  fetchDocumentaryMovies(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/movie/6`);
  }


}


