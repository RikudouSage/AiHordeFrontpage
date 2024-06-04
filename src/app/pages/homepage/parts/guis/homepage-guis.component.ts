import {Component, computed, OnInit} from '@angular/core';
import {InlineSvgComponent} from "../../../../components/inline-svg/inline-svg.component";
import {TranslocoMarkupComponent} from "ngx-transloco-markup";
import {CutPipe} from "../../../../pipes/cut.pipe";
import {FormatNumberPipe} from "../../../../pipes/format-number.pipe";
import {ShiftDecimalsLeftPipe} from "../../../../pipes/shift-decimals-left.pipe";
import {SiPrefixPipe} from "../../../../pipes/si-prefix.pipe";
import {TranslocoPipe, TranslocoService} from "@jsverse/transloco";
import {KeyValuePipe, UpperCasePipe} from "@angular/common";
import {GuiCardComponent} from "../../../../components/gui-card/gui-card.component";
import {DataService} from "../../../../services/data.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {NoSorterKeyValue} from "../../../../types/no-sorter-key-value";

@Component({
  selector: 'app-homepage-guis',
  standalone: true,
  imports: [
    InlineSvgComponent,
    TranslocoMarkupComponent,
    CutPipe,
    FormatNumberPipe,
    ShiftDecimalsLeftPipe,
    SiPrefixPipe,
    TranslocoPipe,
    UpperCasePipe,
    GuiCardComponent,
    KeyValuePipe
  ],
  templateUrl: './homepage-guis.component.html',
  styleUrl: './homepage-guis.component.scss'
})
export class HomepageGuisComponent {
  protected readonly NoSorterKeyValue = NoSorterKeyValue;

  private imageGuis = toSignal(this.dataService.imageGuis);
  private textGuis = toSignal(this.dataService.textGuis);

  public guis = computed(() => {
    if (this.imageGuis() === undefined || this.textGuis() === undefined) {
      return undefined;
    }

    return {
      [this.translator.translate('guis.image')]: this.imageGuis(),
      [this.translator.translate('guis.text')]: this.textGuis(),
    };
  });

  constructor(
    private readonly dataService: DataService,
    private readonly translator: TranslocoService,
  ) {
  }
}
