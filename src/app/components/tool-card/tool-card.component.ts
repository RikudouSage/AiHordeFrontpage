import {Component, input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {TranslocoPipe} from "@jsverse/transloco";

@Component({
  selector: 'app-tool-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslocoPipe
  ],
  templateUrl: './tool-card.component.html',
  styleUrl: './tool-card.component.scss'
})
export class ToolCardComponent {
  public name = input.required<string>();
  public link = input.required<string>();
  public description = input.required<string>();

  public darkBackground = input(false);
}
