import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'week'
})
export class WeekPipe implements PipeTransform {

  // weeks = ['一', '二', '三', '四', '五', '六', '日'];
  weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  transform(value: number, ...args: unknown[]): unknown {
    return this.weeks[value];
  }

}
