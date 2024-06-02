import {Component, OnInit, signal} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {TranslocoPipe} from "@jsverse/transloco";
import {DataService} from "../../services/data.service";
import {FaqItem} from "../../types/faq-item";
import {toPromise} from "../../types/resolvable";
import {KeyValuePipe, NgOptimizedImage} from "@angular/common";
import {TranslocoMarkupComponent} from "ngx-transloco-markup";
import {InlineSvgComponent} from "../../components/inline-svg/inline-svg.component";
import {TranslatorService} from "../../services/translator.service";
import {FooterColorService} from "../../services/footer-color.service";
import {SortedItems} from "../../types/sorted-items";
import {NoSorterKeyValue} from "../../types/no-sorter-key-value";

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslocoMarkupComponent,
    KeyValuePipe,
    TranslocoPipe,
    InlineSvgComponent
  ],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent implements OnInit {
  protected readonly NoSorterKeyValue = NoSorterKeyValue;

  public faq = signal<SortedItems<FaqItem>>(new Map<string, FaqItem[]>());
  public selectedFaq = signal<string | null>(null);

  constructor(
    private readonly title: Title,
    private readonly translator: TranslatorService,
    private readonly dataService: DataService,
    private readonly footerColor: FooterColorService,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.title.setTitle(await toPromise(this.translator.get('frequently_asked_questions')) + ' | ' + await toPromise(this.translator.get('app_title')));
    this.faq.set(await toPromise(this.dataService.faq));
    this.footerColor.dark.set(true);
  }
}
