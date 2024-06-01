import { Pipe, PipeTransform } from '@angular/core';
import {TranslocoService} from "@jsverse/transloco";

@Pipe({
  name: 'siPrefix',
  standalone: true
})
export class SiPrefixPipe implements PipeTransform {
  constructor(
    private readonly translator: TranslocoService,
  ) {
  }

  transform(value: number, keep: number = 1, startAt: number = 0): string {
    if (String(value).includes('.')) {
      value = Number(String(value).split('.')[0]);
    }

    let key = 'si_prefix.';
    let groupCount = Math.floor(String(value).length / 3) - (keep - 1);
    if (String(value).length % 3 === 0) {
      groupCount -= 1;
    }
    groupCount += startAt;

    switch (groupCount) {
      case 0:
        key += 'none';
        break;
      case 1:
        key += 'kilo';
        break;
      case 2:
        key += 'mega';
        break;
      case 3:
        key += 'giga';
        break;
      case 4:
        key += 'tera';
        break;
      case 5:
        key += 'peta';
        break;
      case 6:
        key += 'exa';
        break;
      case 7:
        key += 'zetta';
        break;
      default:
        throw new Error(`Unsupported prefix: ${key}`);
    }

    return this.translator.translate(key);
  }

}
