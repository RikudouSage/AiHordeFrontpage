import {Component, OnInit, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from "@angular/common";
import {TranslocoPipe} from "@jsverse/transloco";
import {TranslocoMarkupComponent} from "ngx-transloco-markup";
import {InlineSvgComponent} from "./components/inline-svg/inline-svg.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, TranslocoPipe, TranslocoMarkupComponent, RouterLink, InlineSvgComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public darkMode = signal(false);

  public ngOnInit(): void {
    this.darkMode.set(typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
}
