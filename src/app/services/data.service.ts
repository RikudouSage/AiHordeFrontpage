import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, Observable, of, switchMap, throwError} from "rxjs";
import {FaqItem} from "../types/faq-item";
import {TranslocoService} from "@jsverse/transloco";
import {ToolItem} from "../types/tool-item";
import {SortedItems} from "../types/sorted-items";
import {PrivacyPolicyItem} from "../types/privacy-policy-item";

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

  public get privacyPolicy(): Observable<Map<string, Map<string, PrivacyPolicyItem[]>>> {
    return this.getData<PrivacyPolicyItem>('privacy').pipe(
      map (items => {
        const sorted = this.formatToMapped(items, 'section');
        const result: Map<string, Map<string, PrivacyPolicyItem[]>> = new Map<string, Map<string, PrivacyPolicyItem[]>>();

        sorted.forEach((value, key) => {
          const subSorted = this.formatToMapped(
            value.map(item => {
              const copy = {...item};
              if (copy.context !== undefined) {
                for (const key of Object.keys(copy.context)) {
                  const contextItem = copy.context[key];
                  let targetContextValue: string;
                  switch (contextItem.valueType) {
                    case "date":
                      targetContextValue = new Intl.DateTimeFormat(this.transloco.getActiveLang(), {
                        dateStyle: 'long',
                        timeStyle: undefined,
                      }).format(new Date(contextItem.value));
                      break;
                    default:
                      throw new Error(`Unsupported type: ${contextItem.valueType}`);
                  }

                  copy.text = copy.text.replaceAll(`{${key}}`, targetContextValue);
                }
              }
              return copy;
            }),
            'subsection',
          );
          result.set(key, subSorted);
        });

        return result;
      }),
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
