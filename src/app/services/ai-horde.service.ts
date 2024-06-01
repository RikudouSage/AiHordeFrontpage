import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {ImageTotalStats} from "../types/image-total-stats";
import {HordePerformance} from "../types/horde-performance";
import {TextTotalStats} from "../types/text-total-stats";

@Injectable({
  providedIn: 'root'
})
export class AiHordeService {
  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public get imageStats(): Observable<ImageTotalStats> {
    return of({
      month: { images: 105150339, ps: 1553239485353984 },
      total: { images: 105150339, ps: 1553239485353984 },
      day: { images: 105150339, ps: 1553239485353984 },
      hour: { images: 105150339, ps: 1553239485353984 },
      minute: { images: 105150339, ps: 1553239485353984 },
    });
    // return this.httpClient.get<TotalStats>('https://aihorde.net/api/v2/stats/img/totals');
  }

  public get textStats(): Observable<TextTotalStats> {
    return of({
      total: { requests: 111931745, tokens: 20444501084 },
      day: { requests: 111931745, tokens: 20444501084 },
      hour: { requests: 111931745, tokens: 20444501084 },
      minute: { requests: 111931745, tokens: 20444501084 },
      month: { requests: 111931745, tokens: 20444501084 },
    });
    // return this.httpClient.get<TextTotalStats>('https://aihorde.net/api/v2/stats/text/totals');
  }

  public get performance(): Observable<HordePerformance> {
    return this.httpClient.get<HordePerformance>('https://aihorde.net/api/v2/status/performance');
  }
}
