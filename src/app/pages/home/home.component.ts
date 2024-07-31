import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../../service/movie-api-service.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bannerResult: any = [];
  trendingMovieResult: any = [];
  actionMovieResult: any = [];
  adventureMovieResult: any = [];
  animationMovieResult: any = [];
  comedyMovieResult: any = [];
  documentaryMovieResult: any = [];
  sciencefictionMovieResult: any = [];
  thrillerMovieResult: any = [];

  constructor(
    private movieApiService: MovieApiService,
    private sanitizer: DomSanitizer // Inject DomSanitizer
  ) { }

  ngOnInit(): void {
    this.bannerData();
    this.trendingData();
    this.actionMovie();
    this.adventureMovie();
    this.comedyMovie();
    this.animationMovie();
    this.documentaryMovie();
  }
  bannerData(): void {
    this.movieApiService.bannerApiData().subscribe(
      (result: any) => {
        // Check if result and result.results are as expected
        if (Array.isArray(result)) {
          // Map API response to include dynamic video URLs
          this.bannerResult = result.map((item: any) => ({
            title: item.title,
            description: item.overview,
            videoUrl: this.getEmbedUrl(item.youTubeTrailer), // Assuming you have a `youTubeTrailer` field
          }));
        } else {
          console.error('Unexpected API response structure:', result);
        }
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  getEmbedUrl(videoId: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  trendingData(): void {
    this.movieApiService.trendingMovieApiData().subscribe(
      (result) => {
        if (Array.isArray(result)) {
          this.trendingMovieResult = result;
        } else {
          console.error("Unexpected API response structure:", result);
        }
      },
      (error) => {
        console.error("Error fetching trending movies:", error);
      }
    );
  }
  actionMovie(): void {
    this.movieApiService.fetchActionMovies().subscribe(
      (result) => {
        if (Array.isArray(result)) {
          this.actionMovieResult = result;
        } else {
          console.error("Unexpected API response structure:", result);
        }
      },
      (error) => {
        console.error("Error fetching action movies:", error);
      }
    );
  }

  adventureMovie(): void {
    this.movieApiService.fetchAdventureMovies().subscribe(
      (result) => {
        if (Array.isArray(result)) {
          this.adventureMovieResult = result;
        } else {
          console.error("Unexpected API response structure:", result);
        }
      },
      (error) => {
        console.error("Error fetching adventure movies:", error);
      }
    );
  }

  animationMovie(): void {
    this.movieApiService.fetchAnimationMovies().subscribe(
      (result) => {
        if (Array.isArray(result)) {
          this.animationMovieResult = result;
        } else {
          console.error("Unexpected API response structure:", result);
        }
      },
      (error) => {
        console.error("Error fetching animation movies:", error);
      }
    );
  }

  comedyMovie(): void {
    this.movieApiService.fetchComedyMovies().subscribe(
      (result) => {
        if (Array.isArray(result)) {
          this.comedyMovieResult = result;
        } else {
          console.error("Unexpected API response structure:", result);
        }
      },
      (error) => {
        console.error("Error fetching comedy movies:", error);
      }
    );
  }

  documentaryMovie(): void {
    this.movieApiService.fetchDocumentaryMovies().subscribe(
      (result) => {
        if ( Array.isArray(result)) {
          this.documentaryMovieResult = result;
        } else {
          console.error("Unexpected API response structure:", result);
        }
      },
      (error) => {
        console.error("Error fetching documentary movies:", error);
      }
    );
  }

}
