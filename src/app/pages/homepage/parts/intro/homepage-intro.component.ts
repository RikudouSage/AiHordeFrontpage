import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {TranslocoMarkupComponent} from "ngx-transloco-markup";

@Component({
  selector: 'app-homepage-intro',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslocoMarkupComponent
  ],
  templateUrl: './homepage-intro.component.html',
  styleUrl: './homepage-intro.component.scss'
})
export class HomepageIntroComponent {

}
