import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  getMovieDetailResult: any;
  getMovieVideoResult: string | null = null;
  reviews: string = '';
  runtime: number | null = null;
  productionCompanies: string = '';
  productionCountries: string = '';
  genres: string = '';
  crew: string = '';
  posterPath: string = '';
  backdropPath: string = '';
  showTrailer: boolean = false;

  // Safe URL for the trailer
  sanitizedTrailerUrl: SafeResourceUrl | null = null;

  movieData = {
    reviews: '"Despicable Me 4" is a delightful addition to the beloved animated franchise, bringing back the charm and humor that fans adore. Directed by Kyle Balda, the film sees the return of Gru, voiced by Steve Carell, and his mischievous Minions on another entertain...',
    runtime: 94,
    id: 122,
    title: 'The Lord of the Rings: The Return of the King',
    popularity: 3517.78,
    voteAverage: 7.22,
    voteCount: 397,
    budget: 100000000,
    revenue: 580680150,
    overview: 'Gru and Lucy and their girls — Margo, Edith and Agnes — welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Meanwhile, Gru faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.',
    posterPath: 'wWba3TaojhK7NdycRhoQpsG0FaH.jpg',
    releaseDate: '2024-06-20',
    tagline: 'Things just got a little more despicable.',
    genres: 'Animation, Family, Comedy, Action',
    cast: 'Steve Carell, Kristen Wiig, Joey King, Will Ferrell, Sofía Vergara, Miranda Cosgrove, Dana Gaier, Madison Polan, Pierre Coffin, Steve Coogan, Stephen Colbert, Chloe Fineman, Brad Ableson, John DiMaggio, Laraine Newman, Tara Strong, Romesh Ranganathan, Brad Ableson, Barbara Harris, Eden Boulton, JP Karliak, Cathy Cavadini, Arif S. Kinchen, Will Collyer, Jeremy Maxwell, Abby Craden, Ken Daurio, Khary Payton, John DeMita, Aaron Fors, Isaac Robinson-Smith, Willow Geer, Isa Hall, Nisa Ward, Aaron Hendry, Andreana Weiner, Colette Whitaker, Chris Renaud',
    crew: 'Ken Daurio (Characters), Cinco Paul (Characters), Chris Renaud (Director), Patrick Delage (Co-Director), Chris Meledandri (Producer), Brett Hoffman (Producer), Pharrell Williams (Songs), Heikki Kossi (Foley Artist), Heitor Pereira (Music), Tiffany Hillkurtz (Editor), Helena Muzi Cohen (Production Manager), Sandrine Lagareste (Production Supervisor), Sean Lawrence (Production Supervisor), Charlotte Reichenbach (Production Supervisor), Reggie Umali (Production Manager), Barbara Harris (Casting), Mike White (Writer), Ken Daurio (Writer), Daniel Laurie (Supervising Sound Editor), Jeremy Bowker (Supervising Sound Editor), Jeremy Bowker (Sound Designer), Gary Rizzo (Sound Re-Recording Mixer), Scott R. Lewis (Sound Re-Recording Mixer), Marco Allard (Storyboard Artist), David Feiss (Storyboard Artist), Chris Allison (Storyboard Artist), Serguei Kouchnerov (Storyboard Artist), James Wootton (Storyboard Artist), Scott Cooper (Storyboard Artist), Chris Martin (Storyboard Artist), Bryan Cox (Storyboard Artist), Glenn McCoy (Storyboard Artist), Jim Craig (Storyboard Artist), Luis Zamora Pueyo (Storyboard Artist), Eric Favela (Storyboard Artist), Brad Ableson (Additional Storyboarding), Josh Lieberman (Additional Storyboarding), ',
    keywords: 'superhero, villain, sequel, super villain, illumination, kids',
    youTubeTrailer: 'LtNYaH61dXY',
    backdropPath: 'fDmci71SMkfZM8RnCuXJVDPaSdE.jpg',
    productionCompanies: 'Illumination, Universal Pictures',
    productionCountries: 'United States of America'
  };

  constructor(
    private title: Title,
    private meta: Meta,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.setStaticData();
  }

  setStaticData(): void {
    this.getMovieDetailResult = this.movieData;
    this.reviews = this.movieData.reviews || '';
    this.runtime = this.movieData.runtime || null;
    this.productionCompanies = this.movieData.productionCompanies || '';
    this.productionCountries = this.movieData.productionCountries || '';
    this.genres = this.movieData.genres || '';
    this.crew = this.movieData.crew || '';
    this.posterPath = this.movieData.posterPath || '';
    this.backdropPath = this.movieData.backdropPath || '';
    this.getMovieVideoResult = this.movieData.youTubeTrailer;
  
    if (isPlatformBrowser(this.platformId)) {
      // Sanitize and bind YouTube URL
      this.sanitizedTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.getMovieVideoResult}`);
      
      // Update meta tags only in the browser
      this.title.setTitle(`${this.getMovieDetailResult.title} | ${this.getMovieDetailResult.tagline}`);
      this.meta.updateTag({ name: 'title', content: this.getMovieDetailResult.title });
      this.meta.updateTag({ name: 'description', content: this.getMovieDetailResult.overview });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ property: 'og:url', content: window.location.href });
      this.meta.updateTag({ property: 'og:title', content: this.getMovieDetailResult.title });
      this.meta.updateTag({ property: 'og:description', content: this.getMovieDetailResult.overview });
      this.meta.updateTag({ property: 'og:image', content: `https://image.tmdb.org/t/p/original/${this.getMovieDetailResult.backdropPath}` });
    }
  }

  toggleTrailer(): void {
    this.showTrailer = !this.showTrailer;
  }
}
