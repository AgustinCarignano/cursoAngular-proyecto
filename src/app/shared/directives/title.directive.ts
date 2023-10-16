import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTitle]',
})
export class TitleDirective {
  constructor(elementRef: ElementRef<HTMLElement>) {
    elementRef.nativeElement.style.fontSize = '30px';
    elementRef.nativeElement.style.fontWeight = '500';
    elementRef.nativeElement.style.textTransform = 'uppercase';
    elementRef.nativeElement.style.color = '#000000DE';
  }
}
