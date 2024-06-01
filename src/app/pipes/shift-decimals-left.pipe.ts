import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shiftDecimalsLeft',
  standalone: true
})
export class ShiftDecimalsLeftPipe implements PipeTransform {

  transform(value: number, keep: number = 1): number {
    while (String(value).split(".")[0].length > (3 * keep)) {
      value /= 1_000;
    }

    return value;
  }

}
