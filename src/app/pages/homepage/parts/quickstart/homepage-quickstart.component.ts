import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {TranslocoMarkupComponent} from "ngx-transloco-markup";
import {TranslocoPipe} from "@jsverse/transloco";
import {InlineSvgComponent} from "../../../../components/inline-svg/inline-svg.component";

@Component({
  selector: 'app-homepage-quickstart',
  standalone: true,
  imports: [
    RouterLink,
    TranslocoMarkupComponent,
    TranslocoPipe,
    InlineSvgComponent
  ],
  templateUrl: './homepage-quickstart.component.html',
  styleUrl: './homepage-quickstart.component.scss'
})
export class HomepageQuickstartComponent {

}
