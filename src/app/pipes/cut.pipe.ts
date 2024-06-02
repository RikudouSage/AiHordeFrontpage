import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'cut',
  standalone: true
})
export class CutPipe implements PipeTransform {

  transform(value: string, length: number): string {
    return value.substring(0, length);
  }

}
