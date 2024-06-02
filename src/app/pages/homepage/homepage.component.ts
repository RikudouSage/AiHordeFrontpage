import {Component} from '@angular/core';
import {HomepageIntroComponent} from "./parts/intro/homepage-intro.component";
import {HomepageSponsorsComponent} from "./parts/sponsors/homepage-sponsors.component";
import {HomepageLatestNewsComponent} from "./parts/latest-news/homepage-latest-news.component";
import {HomepageStatsComponent} from "./parts/stats/homepage-stats.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    HomepageIntroComponent,
    HomepageSponsorsComponent,
    HomepageLatestNewsComponent,
    HomepageStatsComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
}
