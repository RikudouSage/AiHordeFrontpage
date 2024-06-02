import {Component, input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {TranslocoPipe} from "@jsverse/transloco";

@Component({
  selector: 'app-gui-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslocoPipe
  ],
  templateUrl: './gui-card.component.html',
  styleUrl: './gui-card.component.scss'
})
export class GuiCardComponent {
  public name = input.required<string>();
  public link = input.required<string>();
  public description = input.required<string>();
  public image = input.required<string>();

  public goToLinkName = input<string | null>(null);
}
