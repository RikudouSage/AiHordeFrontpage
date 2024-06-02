import {Component, OnInit} from '@angular/core';
import {GuiCardComponent} from "../../../../components/gui-card/gui-card.component";
import {TranslocoMarkupComponent} from "ngx-transloco-markup";
import {TranslocoPipe} from "@jsverse/transloco";
import {ToolCardComponent} from "../../../../components/tool-card/tool-card.component";
import {DataService} from "../../../../services/data.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {KeyValuePipe} from "@angular/common";
import {NoSorterKeyValue} from "../../../../types/no-sorter-key-value";

@Component({
  selector: 'app-homepage-tools',
  standalone: true,
  imports: [
    GuiCardComponent,
    TranslocoMarkupComponent,
    TranslocoPipe,
    ToolCardComponent,
    KeyValuePipe
  ],
  templateUrl: './homepage-tools.component.html',
  styleUrl: './homepage-tools.component.scss'
})
export class HomepageToolsComponent {
  protected readonly NoSorterKeyValue = NoSorterKeyValue;

  public tools = toSignal(this.dataService.tools);

  constructor(
    private readonly dataService: DataService,
  ) {
  }
}
