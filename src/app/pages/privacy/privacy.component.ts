import {Component, OnInit, signal} from '@angular/core';
import {DataService} from "../../services/data.service";
import {toPromise} from "../../types/resolvable";
import {toSignal} from "@angular/core/rxjs-interop";
import {InlineSvgComponent} from "../../components/inline-svg/inline-svg.component";
import {TranslocoMarkupComponent} from "ngx-transloco-markup";
import {FooterColorService} from "../../services/footer-color.service";
import {KeyValuePipe} from "@angular/common";
import {NoSorterKeyValue} from "../../types/no-sorter-key-value";
import {ReplacePipe} from "../../pipes/replace.pipe";
import {TranslatorService} from "../../services/translator.service";
import {Title} from "@angular/platform-browser";
import {AiHordeService} from "../../services/ai-horde.service";

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [
    InlineSvgComponent,
    TranslocoMarkupComponent,
    KeyValuePipe,
    ReplacePipe
  ],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent implements OnInit {
  protected readonly NoSorterKeyValue = NoSorterKeyValue;
  public policy = signal<string | null>(null);

  constructor(
    private readonly footerColor: FooterColorService,
    private readonly translator: TranslatorService,
    private readonly titleService: Title,
    private readonly aiHorde: AiHordeService,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.footerColor.dark.set(true);
    this.policy.set(await toPromise(this.aiHorde.privacyPolicy));
    this.titleService.setTitle(await toPromise(this.translator.get('privacy_policy')));
  }
}
