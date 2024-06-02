import {Component, OnInit, signal} from '@angular/core';
import {CutPipe} from "../../../../pipes/cut.pipe";
import {FormatNumberPipe} from "../../../../pipes/format-number.pipe";
import {InlineSvgComponent} from "../../../../components/inline-svg/inline-svg.component";
import {ShiftDecimalsLeftPipe} from "../../../../pipes/shift-decimals-left.pipe";
import {SiPrefixPipe} from "../../../../pipes/si-prefix.pipe";
import {TranslocoMarkupComponent} from "ngx-transloco-markup";
import {TranslocoPipe} from "@jsverse/transloco";
import {UpperCasePipe} from "@angular/common";
import {HordePerformance} from "../../../../types/horde-performance";
import {SingleImageStatPoint} from "../../../../types/single-image-stat-point";
import {SingleTextStatPoint} from "../../../../types/single-text-stat-point";
import {AiHordeService} from "../../../../services/ai-horde.service";
import {toPromise} from "../../../../types/resolvable";

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
export class HomepageStatsComponent implements OnInit {
  public stats = signal<HordePerformance | null>(null);
  public imageStats = signal<SingleImageStatPoint | null>(null);
  public textStats = signal<SingleTextStatPoint | null>(null);

  constructor(
    private readonly aiHorde: AiHordeService,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.stats.set(await toPromise(this.aiHorde.performance));
    this.imageStats.set((await toPromise(this.aiHorde.imageStats)).total);
    this.textStats.set((await toPromise(this.aiHorde.textStats)).total);
  }
}
