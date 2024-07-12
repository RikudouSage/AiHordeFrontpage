import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from "rxjs";
import {ImageTotalStats} from "../types/image-total-stats";
import {HordePerformance} from "../types/horde-performance";
import {TextTotalStats} from "../types/text-total-stats";
import {NewsItem} from "../types/news.types";
import {SingleInterrogationStatPoint} from "../types/single-interrogation-stat-point";
import {HordeNewsItem} from "../types/horde-news-item";
import {marked} from "marked";
import {type} from "node:os";

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

  // The endpoint `https://aihorde.net/api/v2/documents/terms?format=html` returns the terms and conditions with a field "html" containing the HTML content.
  public getTerms(): Observable<string> {
    return this.httpClient.get<any>('https://aihorde.net/api/v2/documents/terms?format=html').pipe(
      map(response => response.html)
    );
  }

  public getNews(count?: number): Observable<NewsItem[]> {
    return this.httpClient.get<HordeNewsItem[]>('https://aihorde.net/api/v2/status/news').pipe(
      map(newsItems => count ? newsItems.slice(0, count) : newsItems),
      map(newsItems => newsItems.map(newsItem => {
        return {
          title: newsItem.title,
          datePublished: newsItem.date_published,
          excerpt: newsItem.newspiece,
          moreLink: newsItem.more_info_urls.length > 0 ? newsItem.more_info_urls[0] : null,
        };
      })),
    );
  }
}
