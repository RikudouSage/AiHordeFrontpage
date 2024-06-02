import { Component } from '@angular/core';
import {GuiCardComponent} from "../../../../components/gui-card/gui-card.component";
import {TranslocoMarkupComponent} from "ngx-transloco-markup";
import {TranslocoPipe} from "@jsverse/transloco";
import {ToolCardComponent} from "../../../../components/tool-card/tool-card.component";

@Component({
  selector: 'app-homepage-tools',
  standalone: true,
  imports: [
    GuiCardComponent,
    TranslocoMarkupComponent,
    TranslocoPipe,
    ToolCardComponent
  ],
  templateUrl: './homepage-tools.component.html',
  styleUrl: './homepage-tools.component.scss'
})
export class HomepageToolsComponent {

}
