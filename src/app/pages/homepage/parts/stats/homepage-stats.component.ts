import {Component, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID, signal} from '@angular/core';
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
import {interval, startWith} from "rxjs";
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
    private readonly zone: NgZone,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public async ngOnInit(): Promise<void> {
    await this.updateStats();

    this.zone.runOutsideAngular(() => {
      this.subscriptions.add(interval(60_000).pipe(
        startWith(0),
      ).subscribe(async () => {
        await this.zone.run(async () => await this.updateStats());
      }));
    });
  }

  private async updateStats(): Promise<void> {
    const responses = await Promise.all([
      toPromise(this.aiHorde.performance),
      toPromise(this.aiHorde.imageStats),
      toPromise(this.aiHorde.textStats),
      toPromise(this.aiHorde.interrogationStats),
    ]);
    this.stats.set(responses[0]);
    this.imageStats.set(responses[1].total);
    this.textStats.set(responses[2].total);
    this.interrogationStats.set(responses[3]);
  }
}
