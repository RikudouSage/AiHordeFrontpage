import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {FaqItem, SortedFaqItems} from "../types/faq-item";
import {TranslocoService} from "@jsverse/transloco";

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly transloco: TranslocoService,
  ) {
  }

  public get faq(): Observable<SortedFaqItems> {
    return this.httpClient.get<FaqItem[]>(`/assets/data/faq.${this.transloco.getActiveLang()}.json`).pipe(
      map (faq => {
        const result: SortedFaqItems = new Map<string, FaqItem[]>();
        for (const item of faq) {
          item.section ??= '';
          result.has(item.section) || result.set(item.section, []);
          result.get(item.section)!.push(item);
        }

        return result;
      }),
    );
  }
}
