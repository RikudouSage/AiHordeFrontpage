import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from "@angular/common";
import {TranslocoPipe} from "@jsverse/transloco";
import {TranslocoMarkupComponent} from "ngx-transloco-markup";
import {InlineSvgComponent} from "./components/inline-svg/inline-svg.component";
import {FooterColorService} from "./services/footer-color.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, TranslocoPipe, TranslocoMarkupComponent, RouterLink, InlineSvgComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public darkMode = signal(false);
  public darkFooter = this.footerColor.dark;

  constructor(
    private readonly footerColor: FooterColorService,
  ) {
  }

  public ngOnInit(): void {
    this.darkMode.set(typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
}
