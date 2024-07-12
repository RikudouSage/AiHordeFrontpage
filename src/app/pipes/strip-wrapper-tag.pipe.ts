import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripWrapperTag',
  standalone: true
})
export class StripWrapperTagPipe implements PipeTransform {

  transform(value: string): string {
    if (!value.startsWith('<')) {
      return value;
    }

    const regex = /^<.+?>/;
    if (!regex.test(value)) {
      return value;
    }

    const match = regex.exec(value);
    if (match === null) {
      return value;
    }

    const tag = match[0];
    const closing = `</${tag.substring(1)}`;

    return value.substring(tag.length, value.length - closing.length - 1);
  }

}
