import {Component, OnInit} from '@angular/core';
import {HomepageIntroComponent} from "./parts/intro/homepage-intro.component";
import {HomepageSponsorsComponent} from "./parts/sponsors/homepage-sponsors.component";
import {HomepageLatestNewsComponent} from "./parts/latest-news/homepage-latest-news.component";
import {HomepageStatsComponent} from "./parts/stats/homepage-stats.component";
import {Title} from "@angular/platform-browser";
import {TranslocoService} from "@jsverse/transloco";

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
export class HomepageComponent implements OnInit {
  constructor(
    private readonly title: Title,
    private readonly translator: TranslocoService,
  ) {
  }

  ngOnInit(): void {
    this.title.setTitle(this.translator.translate('app_title'));
  }
}
