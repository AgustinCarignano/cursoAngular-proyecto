import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  private now = new Date().getTime();
  private factor = 1000 * 60 * 60 * 24 * 365.25;

  transform(value: Date): number {
    return Math.floor((this.now - value.getTime()) / this.factor);
  }
}
