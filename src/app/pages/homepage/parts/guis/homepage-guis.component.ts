import { Component } from '@angular/core';
import {InlineSvgComponent} from "../../../../components/inline-svg/inline-svg.component";
import {TranslocoMarkupComponent} from "ngx-transloco-markup";
import {CutPipe} from "../../../../pipes/cut.pipe";
import {FormatNumberPipe} from "../../../../pipes/format-number.pipe";
import {ShiftDecimalsLeftPipe} from "../../../../pipes/shift-decimals-left.pipe";
import {SiPrefixPipe} from "../../../../pipes/si-prefix.pipe";
import {TranslocoPipe} from "@jsverse/transloco";
import {UpperCasePipe} from "@angular/common";
import {GuiCardComponent} from "../../../../components/gui-card/gui-card.component";

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
    GuiCardComponent
  ],
  templateUrl: './homepage-guis.component.html',
  styleUrl: './homepage-guis.component.scss'
})
export class HomepageGuisComponent {

}
