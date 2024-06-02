import {Component, OnInit, signal} from '@angular/core';
import {JsonPipe, NgOptimizedImage, UpperCasePipe} from "@angular/common";
import {TranslocoMarkupComponent} from "ngx-transloco-markup";
import {TranslocoPipe} from "@jsverse/transloco";
import {NewsItem} from "../../types/news.types";
import {RouterLink} from "@angular/router";
import {InlineSvgComponent} from "../../components/inline-svg/inline-svg.component";
import {AiHordeService} from "../../services/ai-horde.service";
import {SingleImageStatPoint} from "../../types/single-image-stat-point";
import {toPromise} from "../../types/resolvable";
import {SiPrefixPipe} from "../../pipes/si-prefix.pipe";
import {ShiftDecimalsLeftPipe} from "../../pipes/shift-decimals-left.pipe";
import {FormatNumberPipe} from "../../pipes/format-number.pipe";
import {HordePerformance} from "../../types/horde-performance";
import {CutPipe} from "../../pipes/cut.pipe";
import {SingleTextStatPoint} from "../../types/single-text-stat-point";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslocoMarkupComponent,
    TranslocoPipe,
    JsonPipe,
    RouterLink,
    InlineSvgComponent,
    SiPrefixPipe,
    ShiftDecimalsLeftPipe,
    FormatNumberPipe,
    CutPipe,
    UpperCasePipe
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  public news = signal<NewsItem[]>([]);
  public stats = signal<HordePerformance | null>(null);
  public imageStats = signal<SingleImageStatPoint | null>(null);
  public textStats = signal<SingleTextStatPoint | null>(null);

  constructor(
    private readonly aiHorde: AiHordeService,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.news.set(await toPromise(this.aiHorde.getNews(3)));
    this.stats.set(await toPromise(this.aiHorde.performance));
    this.imageStats.set((await toPromise(this.aiHorde.imageStats)).total);
    this.textStats.set((await toPromise(this.aiHorde.textStats)).total);
  }
}
