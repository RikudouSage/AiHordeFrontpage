import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {FaqItem} from "../types/faq-item";
import {TranslocoService} from "@jsverse/transloco";
import {ToolItem} from "../types/tool-item";
import {SortedItems} from "../types/sorted-items";

type ObjectWithStringKey<TObject, TKey extends keyof TObject> = TObject[TKey] extends string | null ? TObject : never;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly transloco: TranslocoService,
  ) {
  }

  public get faq(): Observable<SortedItems<FaqItem>> {
    return this.httpClient.get<FaqItem[]>(`/assets/data/faq.${this.transloco.getActiveLang()}.json`).pipe(
      map (faq => this.formatToMapped(faq, 'section')),
    );
  }

  public get tools(): Observable<SortedItems<ToolItem>> {
    return this.httpClient.get<ToolItem[]>(`/assets/data/tools.${this.transloco.getActiveLang()}.json`).pipe(
      map(tools => this.formatToMapped(tools, 'category')),
    );
  }

  private formatToMapped<TObject, TKey extends keyof TObject>(objects: ObjectWithStringKey<TObject, TKey>[], key: TKey): SortedItems<TObject> {
    const result: SortedItems<TObject> = new Map<string, TObject[]>();
    for (const object of objects) {
      object[key] ??= '' as any;
      result.has(object[key] as string) || result.set(object[key] as string, []);
      result.get(object[key] as string)!.push(object);
    }

    return result;
  }
}
