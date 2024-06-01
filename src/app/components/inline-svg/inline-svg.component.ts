import {Component, input, OnInit, signal} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {toPromise} from "../../types/resolvable";

@Component({
  selector: 'inline-svg',
  standalone: true,
  imports: [],
  templateUrl: './inline-svg.component.html',
  styleUrl: './inline-svg.component.scss'
})
export class InlineSvgComponent implements OnInit {
  public href = input.required<string>();

  protected svgContent = signal<SafeHtml | null>(null);

  constructor(
    private readonly httpClient: HttpClient,
    private readonly sanitizer: DomSanitizer,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.svgContent.set(this.sanitizer.bypassSecurityTrustHtml(await toPromise(this.httpClient.get(this.href(), {
      responseType: 'text',
    }))));
  }
}
