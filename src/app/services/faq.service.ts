import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {FaqItem, SortedFaqItems} from "../types/faq-item";

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public get faq(): Observable<SortedFaqItems> {
    return this.httpClient.get<FaqItem[]>("/assets/data/faq.json").pipe(
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
