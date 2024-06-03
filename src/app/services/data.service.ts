import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, Observable, of, switchMap, throwError} from "rxjs";
import {FaqItem} from "../types/faq-item";
import {TranslocoService} from "@jsverse/transloco";
import {ToolItem} from "../types/tool-item";
import {SortedItems} from "../types/sorted-items";

type ObjectWithMappableKey<TObject, TKey extends keyof TObject> = TObject[TKey] extends string | null ? TObject : never;

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
    return this.getData<FaqItem>('faq').pipe(
      map (faq => this.formatToMapped(faq, 'section')),
    );
  }

  public get tools(): Observable<SortedItems<ToolItem>> {
    return this.getData<ToolItem>('tools').pipe(
      map(tools => this.formatToMapped(tools, 'category')),
    );
  }

  private formatToMapped<TObject, TKey extends keyof TObject>(objects: ObjectWithMappableKey<TObject, TKey>[], key: TKey): SortedItems<TObject> {
    const result: SortedItems<TObject> = new Map<string, TObject[]>();
    for (const object of objects) {
      object[key] ??= '' as any;
      result.has(object[key] as string) || result.set(object[key] as string, []);
      result.get(object[key] as string)!.push(object);
    }

    return result;
  }

  private getData<T>(file: string): Observable<T[]> {
    return this.httpClient.get<T[]>(`/assets/data/${file}.${this.transloco.getActiveLang()}.json`).pipe(
      catchError ((e: HttpErrorResponse) => {
        if (e.status !== 404) {
          return throwError(() => e);
        }

        return this.httpClient.get<T[]>(`/assets/data/${file}.en.json`);
      }),
    );
  }
}
