import {Pipe, PipeTransform} from '@angular/core';
import {TranslocoService} from "@jsverse/transloco";

@Pipe({
  name: 'formatNumber',
  standalone: true
})
export class FormatNumberPipe implements PipeTransform {

  constructor(
    private readonly transloco: TranslocoService,
  ) {
  }

  public transform(value: number, decimals: number = 0): string {
    return new Intl.NumberFormat(this.transloco.getActiveLang(), {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  }

}
