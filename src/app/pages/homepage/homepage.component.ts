import {Component, OnInit} from '@angular/core';
import {HomepageIntroComponent} from "./parts/intro/homepage-intro.component";
import {HomepageSponsorsComponent} from "./parts/sponsors/homepage-sponsors.component";
import {HomepageLatestNewsComponent} from "./parts/latest-news/homepage-latest-news.component";
import {HomepageStatsComponent} from "./parts/stats/homepage-stats.component";
import {Title} from "@angular/platform-browser";
import {TranslatorService} from "../../services/translator.service";
import {toPromise} from "../../types/resolvable";
import {HomepageQuickstartComponent} from "./parts/quickstart/homepage-quickstart.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    HomepageIntroComponent,
    HomepageSponsorsComponent,
    HomepageLatestNewsComponent,
    HomepageStatsComponent,
    HomepageQuickstartComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  constructor(
    private readonly title: Title,
    private readonly translator: TranslatorService,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.title.setTitle(await toPromise(this.translator.get('app_title')));
  }
}
