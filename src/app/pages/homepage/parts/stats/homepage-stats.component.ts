import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {CutPipe} from "../../../../pipes/cut.pipe";
import {FormatNumberPipe} from "../../../../pipes/format-number.pipe";
import {InlineSvgComponent} from "../../../../components/inline-svg/inline-svg.component";
import {ShiftDecimalsLeftPipe} from "../../../../pipes/shift-decimals-left.pipe";
import {SiPrefixPipe} from "../../../../pipes/si-prefix.pipe";
import {TranslocoMarkupComponent} from "ngx-transloco-markup";
import {TranslocoPipe} from "@jsverse/transloco";
import {isPlatformBrowser, UpperCasePipe} from "@angular/common";
import {HordePerformance} from "../../../../types/horde-performance";
import {SingleImageStatPoint} from "../../../../types/single-image-stat-point";
import {SingleTextStatPoint} from "../../../../types/single-text-stat-point";
import {AiHordeService} from "../../../../services/ai-horde.service";
import {toPromise} from "../../../../types/resolvable";
import {combineLatestWith, interval, startWith} from "rxjs";
import {Subscriptions} from "../../../../helper/subscriptions";
import {SingleInterrogationStatPoint} from "../../../../types/single-interrogation-stat-point";

@Component({
  selector: 'app-homepage-stats',
  standalone: true,
  imports: [
    CutPipe,
    FormatNumberPipe,
    InlineSvgComponent,
    ShiftDecimalsLeftPipe,
    SiPrefixPipe,
    TranslocoMarkupComponent,
    TranslocoPipe,
    UpperCasePipe
  ],
  templateUrl: './homepage-stats.component.html',
  styleUrl: './homepage-stats.component.scss'
})
export class HomepageStatsComponent implements OnInit, OnDestroy {
  private readonly isBrowser: boolean;
  private readonly subscriptions = new Subscriptions();

  public stats = signal<HordePerformance | null>(null);
  public imageStats = signal<SingleImageStatPoint | null>(null);
  public textStats = signal<SingleTextStatPoint | null>(null);
  public interrogationStats = signal<SingleInterrogationStatPoint | null>(null);

  constructor(
    private readonly aiHorde: AiHordeService,
    @Inject(PLATFORM_ID) platformId: string,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public ngOnInit(): void {
    if (this.isBrowser) {
      this.subscriptions.add(interval(60_000).pipe(
        startWith(0),
        combineLatestWith(this.aiHorde.performance, this.aiHorde.imageStats, this.aiHorde.textStats, this.aiHorde.interrogationStats)
      ).subscribe(value => {
        this.stats.set(value[1]);
        this.imageStats.set(value[2].total);
        this.textStats.set(value[3].total);
        this.interrogationStats.set(value[4]);
      }));
    } else {
      toPromise(this.aiHorde.performance).then(value => this.stats.set(value));
      toPromise(this.aiHorde.imageStats).then(value => this.imageStats.set(value.total));
      toPromise(this.aiHorde.textStats).then(value => this.textStats.set(value.total));
      toPromise(this.aiHorde.interrogationStats).then(value => this.interrogationStats.set(value));
    }
  }
}