import {Component, OnInit, signal} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {TranslocoPipe, TranslocoService} from "@jsverse/transloco";
import {FaqService} from "../../services/faq.service";
import {FaqItem, SortedFaqItems} from "../../types/faq-item";
import {toPromise} from "../../types/resolvable";
import {KeyValue, KeyValuePipe, NgOptimizedImage} from "@angular/common";
import {TranslocoMarkupComponent} from "ngx-transloco-markup";
import {InlineSvgComponent} from "../../components/inline-svg/inline-svg.component";

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
  /**
   * This is used as a sorter for the `keyvalue` pipe in the template. By default, keys are sorted alphabetically,
   * this function makes it keep the original order from the source object.
   */
  protected readonly keyValueComparator = () => 0;

  public faq = signal<SortedFaqItems>(new Map<string, FaqItem[]>());
  public selectedFaq = signal<string | null>(null);

  constructor(
    private readonly title: Title,
    private readonly translator: TranslocoService,
    private readonly faqService: FaqService,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.title.setTitle(this.translator.translate('frequently_asked_questions') + ' | ' + this.translator.translate('app_title'));
    this.faq.set(await toPromise(this.faqService.faq));
  }
}
