import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'period'
})
export class PeriodPipe implements PipeTransform {

  periods = ["不要重複", "每日", "每週", "每月", "每年"];

  transform(value: number, ...args: unknown[]): unknown {
    return this.periods[value-1];
  }

}
