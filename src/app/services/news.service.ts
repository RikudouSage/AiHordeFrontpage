import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NewsItem} from "../types/news.types";
import {toPromise} from "../types/resolvable";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private readonly httpClient: HttpClient,
  ) {}

  public async getNews(count: number): Promise<NewsItem[]> {
    return await toPromise(this.httpClient.get<NewsItem[]>('/assets/data/news.json').pipe(
      map(items => items.slice(0, count)),
    ));
  }
}
