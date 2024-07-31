import { CommonModule, NgStyle } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgStyle,HttpClientModule,CommonModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  navList = ["TV Shows", "News & Popular", "My List", "Browse by Language" ,"Search","Home"]
item: any;
  getRouterLink(item: string): string {
    switch (item.toLowerCase()) {
      case 'search':
        return '/search';
      case 'home':
        return '/';
      default:
        return '#'; // Default or no link for other items
    }
  }
  title = 'movies';
  navbg:any;
  @HostListener('document:scroll') scrollover(){
    
    if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0)
    {
      this.navbg = {
        'background-color':'#000000'
      }
    }else
    {
        this.navbg = {}
    }
  }
}
