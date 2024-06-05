import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from "rxjs";
import {ImageTotalStats} from "../types/image-total-stats";
import {HordePerformance} from "../types/horde-performance";
import {TextTotalStats} from "../types/text-total-stats";
import {NewsItem} from "../types/news.types";
import {SingleInterrogationStatPoint} from "../types/single-interrogation-stat-point";

@Injectable({
  providedIn: 'root'
})
export class AiHordeService {
  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public get imageStats(): Observable<ImageTotalStats> {
    // return of({
    //   month: { images: 105150339, ps: 1553239485353984 },
    //   total: { images: 105150339, ps: 1553239485353984 },
    //   day: { images: 105150339, ps: 1553239485353984 },
    //   hour: { images: 105150339, ps: 1553239485353984 },
    //   minute: { images: 105150339, ps: 1553239485353984 },
    // });
    return this.httpClient.get<ImageTotalStats>('https://aihorde.net/api/v2/stats/img/totals');
  }

  public get textStats(): Observable<TextTotalStats> {
    // return of({
    //   total: { requests: 111931745, tokens: 20444501084 },
    //   day: { requests: 111931745, tokens: 20444501084 },
    //   hour: { requests: 111931745, tokens: 20444501084 },
    //   minute: { requests: 111931745, tokens: 20444501084 },
    //   month: { requests: 111931745, tokens: 20444501084 },
    // });
    return this.httpClient.get<TextTotalStats>('https://aihorde.net/api/v2/stats/text/totals');
  }

  public get performance(): Observable<HordePerformance> {
    return this.httpClient.get<HordePerformance>('https://aihorde.net/api/v2/status/performance');
  }

  public get interrogationStats(): Observable<SingleInterrogationStatPoint> {
    return of({
      processed: 663723,
    });
  }

  public getNews(count: number): Observable<NewsItem[]> {
    return this.httpClient.get<NewsItem[]>('/assets/data/news.json').pipe(
      map(items => items.slice(0, count)),
    );
  }
}
